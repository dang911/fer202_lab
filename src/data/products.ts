export interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  price: string;
  category?: string;
  rating?: number;
}

export const products: Product[] = [
  {
    id: "prod-1",
    name: "Aura Wireless Headphones",
    image: "/products/wireless-headphones.svg",
    description: "Premium noise-cancelling wireless headphones with 40-hour battery life and spatial audio.",
    price: "$129.99",
    category: "Audio",
    rating: 4.9,
  },
  {
    id: "prod-2",
    name: "Pulse Smartwatch Ultra",
    image: "/products/smart-watch.svg",
    description: "Advanced fitness tracking, AMOLED touch display, sapphire crystal glass, and heart monitoring.",
    price: "$249.00",
    category: "Wearables",
    rating: 4.8,
  },
  {
    id: "prod-3",
    name: "CyberKey RGB Keyboard",
    image: "/products/mechanical-keyboard.svg",
    description: "Custom mechanical keyboard with hot-swappable switches, tactile feedback, and aluminium frame.",
    price: "$89.50",
    category: "Peripherals",
    rating: 4.7,
  },
  {
    id: "prod-4",
    name: "ErgoGlide Precision Mouse",
    image: "/products/ergonomic-mouse.svg",
    description: "Ergonomic wireless mouse engineered for ultimate comfort, 26K DPI optical sensor, and low latency.",
    price: "$59.99",
    category: "Peripherals",
    rating: 4.6,
  },
  {
    id: "prod-5",
    name: "Halo ScreenBar Plus",
    image: "/products/monitor-lamp.svg",
    description: "Asymmetric LED monitor light bar with auto-dimming sensor and zero screen glare technology.",
    price: "$45.00",
    category: "Lighting",
    rating: 4.8,
  },
  {
    id: "prod-6",
    name: "Nomad Tech Backpack",
    image: "/products/leather-backpack.svg",
    description: "Water-resistant commuter backpack with dedicated 16-inch laptop compartment and hidden pockets.",
    price: "$119.95",
    category: "Gear",
    rating: 4.9,
  },
  {
    id: "prod-7",
    name: "SoundWave Mini Speaker",
    image: "/products/portable-speaker.svg",
    description: "Pocket-sized Bluetooth 5.3 speaker with deep bass, 360 sound projection, and IPX7 waterproof rating.",
    price: "$39.99",
    category: "Audio",
    rating: 4.5,
  },
  {
    id: "prod-8",
    name: "HyperPort 10-in-1 Hub",
    image: "/products/usb-dock.svg",
    description: "Versatile USB-C docking station featuring dual 4K HDMI, 100W Power Delivery, and Gigabit Ethernet.",
    price: "$69.99",
    category: "Accessories",
    rating: 4.7,
  },
];
