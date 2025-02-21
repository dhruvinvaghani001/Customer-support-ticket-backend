import { pool } from "../db";
import logger from "../log/logger";
import { Category, Product } from "../types/types";
import { v4 as uuidv4 } from "uuid";

const categories: Omit<Category, "id" | "createdAt">[] = [
  {
    name: "Home Appliances",
    parentCategoryId: null,
  },
  {
    name: "Washing Machines",
    parentCategoryId: null,
  },
  {
    name: "Air Conditioners",
    parentCategoryId: null,
  },
  {
    name: "Smart Homes Devices",
    parentCategoryId: null,
  },
  {
    name: "Networking & Wifi",
    parentCategoryId: null,
  },
  {
    name: "Refrigerators",
    parentCategoryId: null,
  },
];

const products: Omit<Product, "id" | "createdAt">[] = [
  {
    name: "Samsung Split AC 1.5 Ton",
    categoryId: 3,
    description:
      "Samsung energy-efficient split air conditioner with inverter technology.",
  },
  {
    name: "LG Dual Inverter AC 2 Ton",
    categoryId: 3,
    description:
      "LG's latest dual inverter technology AC for efficient cooling.",
  },

  {
    name: "Bosch Front Load Washing Machine",
    categoryId: 4,
    description:
      "Front-loading washing machine with advanced water-saving features.",
  },
  {
    name: "Samsung Top Load Washing Machine",
    categoryId: 4,
    description: "Samsung high-efficiency top-load washing machine.",
  },

  {
    name: "Whirlpool Double-Door Refrigerator",
    categoryId: 1,
    description: "Frost-free double-door refrigerator with fast cooling.",
  },
  {
    name: "LG Smart Inverter Refrigerator",
    categoryId: 1,
    description: "LG's smart inverter refrigerator for power efficiency.",
  },

  {
    name: "Amazon Echo Dot (4th Gen)",
    categoryId: 5,
    description: "Voice-controlled smart speaker with Alexa assistant.",
  },
  {
    name: "Google Nest Hub",
    categoryId: 5,
    description: "Smart display with Google Assistant for home automation.",
  },

  {
    name: "Ring Video Doorbell Pro",
    categoryId: 2,
    description: "Smart video doorbell with real-time monitoring.",
  },
  {
    name: "Arlo Pro 4 Security Camera",
    categoryId: 2,
    description: "Wireless security camera system for home surveillance.",
  },

  {
    name: "Netgear Nighthawk WiFi Router",
    categoryId: 6,
    description: "High-speed gaming and streaming router.",
  },
  {
    name: "TP-Link Mesh WiFi System",
    categoryId: 6,
    description: "Whole-home mesh WiFi system for seamless connectivity.",
  },
];

const seedCategory = async () => {
  try {
    logger.info("🌱 Seeding categories ...");
    await Promise.all(
      categories.map((category) =>
        pool.query(
          `INSERT INTO categories (name, parentCategoryId) VALUES ($1, $2) 
       ON CONFLICT (id) DO NOTHING`,
          [category.name, category.parentCategoryId]
        )
      )
    );
    logger.info("🌱 Categories Seeded ");
  } catch (error) {
    console.log("Category Seeding Failed:", error);
  }
};

const seedProduct = async () => {
  try {
    logger.info("🌱 Seeding Products ...");
    await Promise.all(
      products.map((product) =>
        pool.query(
          `INSERT INTO products (name, categoryId, description) VALUES ($1, $2, $3)
       ON CONFLICT (id) DO NOTHING`,
          [product.name, product.categoryId, product.description]
        )
      )
    );
    logger.info("🌱 Products Seeded ");
  } catch (error) {
    console.log("Product Seeding Failed:", error);
  }
};

const seedUserRole = async () => {
  const roles = [
    "user",
    "support_agent",
    "technical_staff",
    "manager",
    "admin",
  ];

  try {
    logger.info("🌱 Seeding user Roles ...");
    for (const role of roles) {
      await pool.query(
        `INSERT INTO user_role (role_name)
         VALUES ($1)
         ON CONFLICT (role_name) DO NOTHING;`,
        [role]
      );
    }
    logger.info("🌱 user role sedded! ");
  } catch (error) {
    console.log("Product Seeding Failed:", error);
  }
};

async function seedDatabase() {
  try {
    // await seedCategory();
    // await seedProduct();
    // await seedUserRole();
    logger.info("🎉 Database seeding completed!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
}

seedDatabase();
