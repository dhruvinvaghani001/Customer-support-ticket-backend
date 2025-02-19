import { pool } from "../db";
import logger from "../log/logger";
import { Category, Product } from "../types/types";
import { v4 as uuidv4 } from "uuid";

const categories: Omit<Category, "createdAt">[] = [
  {
    id: uuidv4(),
    name: "Home Appliances",
    parentCategoryId: null,
  },
  {
    id: uuidv4(),
    name: "Washing Machines",
    parentCategoryId: null,
  },
  {
    id: uuidv4(),
    name: "Air Conditioners",
    parentCategoryId: null,
  },
  {
    id: uuidv4(),
    name: "Smart Homes Devices",
    parentCategoryId: null,
  },
  {
    id: uuidv4(),
    name: "Networking & Wifi",
    parentCategoryId: null,
  },
  {
    id: uuidv4(),
    name: "Refrigerators",
    parentCategoryId: null,
  },
];

const products: Omit<Product, "createdAt">[] = [
  {
    id: uuidv4(),
    name: "Samsung Split AC 1.5 Ton",
    categoryId: categories[2].id,
    description:
      "Samsung energy-efficient split air conditioner with inverter technology.",
  },
  {
    id: uuidv4(),
    name: "LG Dual Inverter AC 2 Ton",
    categoryId: categories[2].id,
    description:
      "LG's latest dual inverter technology AC for efficient cooling.",
  },

  {
    id: uuidv4(),
    name: "Bosch Front Load Washing Machine",
    categoryId: categories[1].id,
    description:
      "Front-loading washing machine with advanced water-saving features.",
  },
  {
    id: uuidv4(),
    name: "Samsung Top Load Washing Machine",
    categoryId: categories[1].id,
    description: "Samsung high-efficiency top-load washing machine.",
  },

  {
    id: uuidv4(),
    name: "Whirlpool Double-Door Refrigerator",
    categoryId: categories[5].id,
    description: "Frost-free double-door refrigerator with fast cooling.",
  },
  {
    id: uuidv4(),
    name: "LG Smart Inverter Refrigerator",
    categoryId: categories[5].id,
    description: "LG's smart inverter refrigerator for power efficiency.",
  },

  {
    id: uuidv4(),
    name: "Amazon Echo Dot (4th Gen)",
    categoryId: categories[3].id,
    description: "Voice-controlled smart speaker with Alexa assistant.",
  },
  {
    id: uuidv4(),
    name: "Google Nest Hub",
    categoryId: categories[3].id,
    description: "Smart display with Google Assistant for home automation.",
  },

  {
    id: uuidv4(),
    name: "Ring Video Doorbell Pro",
    categoryId: categories[3].id,
    description: "Smart video doorbell with real-time monitoring.",
  },
  {
    id: uuidv4(),
    name: "Arlo Pro 4 Security Camera",
    categoryId: categories[3].id,
    description: "Wireless security camera system for home surveillance.",
  },

  {
    id: uuidv4(),
    name: "Netgear Nighthawk WiFi Router",
    categoryId: categories[4].id,
    description: "High-speed gaming and streaming router.",
  },
  {
    id: uuidv4(),
    name: "TP-Link Mesh WiFi System",
    categoryId: categories[4].id,
    description: "Whole-home mesh WiFi system for seamless connectivity.",
  },
];

const seedCategory = async () => {
  try {
    logger.info("🌱 Seeding categories ...");
    await Promise.all(
      categories.map((category) =>
        pool.query(
          `INSERT INTO categories (id, name, parentCategoryId) VALUES ($1, $2, $3) 
       ON CONFLICT (id) DO NOTHING`,
          [category.id, category.name, category.parentCategoryId]
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
          `INSERT INTO products (id, name, categoryId, description) VALUES ($1, $2, $3, $4) 
       ON CONFLICT (id) DO NOTHING`,
          [product.id, product.name, product.categoryId, product.description]
        )
      )
    );
    logger.info("🌱 Products Seeded ");
  } catch (error) {
    console.log("Product Seeding Failed:", error);
  }
};

async function seedDatabase() {
  try {
    await seedCategory();
    await seedProduct();
    logger.info("🎉 Database seeding completed!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
}

seedDatabase();
