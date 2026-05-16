import db from "../models/index.js";
import { analyzeAnalytics } from "../services/ai.service.js";

const { Booking, Payment, TimeSlot } = db;

export const getAIAnalytics = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        {
          model: TimeSlot,
        },
      ],
    });

    const payments = await Payment.findAll();

    const totalBookings = bookings.length;

    const morning = bookings.filter((booking) =>
      booking.TimeSlot?.time?.includes("Morning")
    ).length;

    const afternoon = bookings.filter((booking) =>
      booking.TimeSlot?.time?.includes("Afternoon")
    ).length;

    const evening = bookings.filter((booking) =>
      booking.TimeSlot?.time?.includes("Evening")
    ).length;

    const seatUtilizationData = [
      {
        label: "Morning (8-12)",
        value: totalBookings
          ? Math.round((morning / totalBookings) * 100)
          : 0,
      },
      {
        label: "Afternoon (12-5)",
        value: totalBookings
          ? Math.round((afternoon / totalBookings) * 100)
          : 0,
      },
      {
        label: "Evening (5-9)",
        value: totalBookings
          ? Math.round((evening / totalBookings) * 100)
          : 0,
      },
    ];

    const totalRevenue = payments.reduce((sum, payment) => {
      return sum + Number(payment.amount || 0);
    }, 0);

    const totalOrders = payments.length;

    const averageOrderValue =
      totalOrders > 0
        ? Number((totalRevenue / totalOrders).toFixed(2))
        : 0;

    const coffeePerformanceData = {
      totalRevenue,
      totalOrders,
      averageOrderValue,
    };

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const weeklyDemandData = days.map((day) => ({
      day,
      bookings: 0,
      orders: 0,
    }));

    bookings.forEach((booking) => {
      const dateValue = booking.createdAt || new Date();
      const dayIndex = new Date(dateValue).getDay();

      weeklyDemandData[dayIndex].bookings += 1;
    });

    payments.forEach((payment) => {
      const dayIndex = new Date(payment.createdAt).getDay();

      weeklyDemandData[dayIndex].orders += 1;
    });

    const analyticsData = {
      seatUtilizationData,
      weeklyDemandData,
      coffeePerformanceData,
    };

    let aiAnalysis;

    try {
      aiAnalysis = await analyzeAnalytics(analyticsData);
    } catch (aiError) {
      aiAnalysis = {
        seatUtilization: {
          insight: "AI analysis is currently unavailable.",
          recommendation: aiError.message,
        },
        weeklyDemand: {
          insight: "AI analysis is currently unavailable.",
          recommendation: aiError.message,
        },
        coffeePerformance: {
          insight: "AI analysis is currently unavailable.",
          recommendation: aiError.message,
        },
      };
    }

    res.status(200).json({
      seatUtilization: {
        chartData: seatUtilizationData,
        analysis: aiAnalysis.seatUtilization,
      },
      weeklyDemand: {
        chartData: weeklyDemandData,
        analysis: aiAnalysis.weeklyDemand,
      },
      coffeePerformance: {
        chartData: coffeePerformanceData,
        analysis: aiAnalysis.coffeePerformance,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate AI analytics",
      error: error.message,
    });
  }
};