
import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

import {
  Utensils,
  ChefHat,
  Clock,
  MapPin,
  Star,
  ArrowRight,
  Menu as MenuIcon,
  X,
  Phone,
  Calendar,
  Users,
  CheckCircle,
  Plus,
  Minus,
  DollarSign,
} from "lucide-react";

/**
 * MOCK DATA
 */
const MENU_ITEMS = [
  {
    id: 1,
    category: "Starters",
    name: "Samosa Chaat",
    description:
      "Crushed crispy samosas topped with chickpeas, yogurt, tamarind chutney, and sev.",
    price: 350, // Updated price in Rupees
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800",
    tags: ["Vegetarian"],
  },
  {
    id: 2,
    category: "Starters",
    name: "Paneer Tikka",
    description:
      "Cubes of cottage cheese marinated in yogurt and spices, grilled in a tandoor.",
    price: 450, // Updated price in Rupees
    image:
      "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=800",
    tags: ["Vegetarian", "GF"],
  },
  {
    id: 3,
    category: "Starters",
    name: "Chicken 65",
    description:
      "Spicy, deep-fried chicken chunks marinated in ginger, lemon, and red chilies.",
    price: 500, // Updated price in Rupees
    image:
      "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&q=80&w=800",
    tags: ["Spicy"],
  },
  {
    id: 4,
    category: "Mains",
    name: "Butter Chicken",
    description:
      "Tender chicken cooked in a rich, creamy tomato and cashew nut gravy.",
    price: 750, // Updated price in Rupees
    image:
      "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=800",
    tags: ["GF"],
  },
  {
    id: 5,
    category: "Mains",
    name: "Lamb Rogan Josh",
    description:
      "Aromatic Kashmiri curry made with tender lamb, fennel, and dry ginger.",
    price: 850, // Updated price in Rupees
    image:
      "https://th.bing.com/th/id/R.d71deb343635bd61f4e6949751dd5d3b?rik=UGos5Til9A%2bnvg&riu=http%3a%2f%2fmaunikagowardhan.co.uk%2fwp-content%2fuploads%2f2010%2f08%2fLamb-Rogan-Josh-2-700x467.jpg&ehk=uO42WKFDzIyVQBm2740BvdIntd3CVnqKjWTqpCkjLFU%3d&risl=&pid=ImgRaw&r=0",
    tags: ["GF"],
  },
  {
    id: 6,
    category: "Mains",
    name: "Dal Makhani",
    description:
      "Black lentils slow-cooked overnight with butter, cream, and kidney beans.",
    price: 600, // Updated price in Rupees
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800",
    tags: ["Vegetarian", "GF"],
  },
  {
    id: 7,
    category: "Desserts",
    name: "Gulab Jamun",
    description:
      "Soft milk-solid dumplings soaked in rose-flavored sugar syrup.",
    price: 250, // Updated price in Rupees
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTrkSTYkhjRV2wggrSj3W1q_RdzdJIA8aT2w&s",
    tags: ["Vegetarian"],
  },
  {
    id: 8,
    category: "Desserts",
    name: "Rasmalai",
    description:
      "Flattened paneer balls soaked in thickened, sweetened milk with saffron.",
    price: 300, // Updated price in Rupees
    image:
      "https://images.unsplash.com/photo-1534938665420-4193effeacc4?auto=format&fit=crop&q=80&w=800",
    tags: ["Vegetarian", "GF"],
  },
  {
    id: 9,
    category: "Desserts",
    name: "Gajar Ka Halwa",
    description: "Warm carrot pudding cooked with milk, ghee, sugar, and nuts.",
    price: 280, // Updated price in Rupees
    image:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjrIHVN4l3XyOcauSVkmYaKkXcDXCSRk4n8wSpy3SUhLBe3O5y_4gZH5RscPhFMIYp9bYKbMtPuLUgds7ffgzo84FZ2fXlSxelUbAER8WJqzBY8EVjT5qTAB0TL7I-qMcWSE3QqLLr_cNbkFNhOcMsBplb3f4_8EFdh0vepmdD4aBjaBfNOXl5v7SiRow/s3840/carrot-halwa.jpg",
    tags: ["Vegetarian", "GF"],
  },
  {
    id: 10,
    category: "Starters",
    name: "Tandoori Prawns",
    description:
      "Char-grilled prawns marinated in yogurt, garlic, and smoked spices.",
    price: 650,
    image:
      "https://flawlessfood.co.uk/wp-content/uploads/2022/06/Tandoori-King-Prawn-Skewers-153-Flawless.jpg",
    tags: ["Spicy", "GF"],
  },
  {
    id: 11,
    category: "Starters",
    name: "Hara Bhara Kebab",
    description: "Spinach and green pea patties blended with aromatic herbs.",
    price: 300,
    image:
      "https://carveyourcraving.com/wp-content/uploads/2024/03/hara-bhara-kebab_.jpg",
    tags: ["Vegetarian"],
  },
  {
    id: 12,
    category: "Mains",
    name: "Palak Paneer",
    description: "Creamy spinach gravy cooked with fresh cottage cheese cubes.",
    price: 700,
    image:
      "https://healthynibblesandbits.com/wp-content/uploads/2020/01/Saag-Paneer-FF.jpg",
    tags: ["Vegetarian", "GF"],
  },
  {
    id: 13,
    category: "Mains",
    name: "Hyderabadi Biryani",
    description:
      "Long-grain basmati rice layered with marinated chicken and spices.",
    price: 850,
    image:
      "https://vismaifood.com/storage/app/uploads/public/980/eb9/ed6/thumb__1200_0_0_0_auto.jpg",
    tags: ["Spicy"],
  },
  {
    id: 14,
    category: "Mains",
    name: "Paneer Butter Masala",
    description: "Soft paneer cubes in a smooth, creamy tomato cashew gravy.",
    price: 680,
    image:
      "https://myfoodstory.com/wp-content/uploads/2021/07/restaurant-style-paneer-butter-masala-2-500x500.jpg",
    tags: ["Vegetarian", "GF"],
  },
  {
    id: 15,
    category: "Mains",
    name: "Fish Curry (Kerala Style)",
    description: "Spicy coconut-based curry with seared fish and curry leaves.",
    price: 800,
    image:
      "https://images.unsplash.com/photo-1625940043658-4b77a2dd9fbb?auto=format&fit=crop&q=80&w=800",
    tags: ["Spicy", "GF"],
  },
  {
    id: 16,
    category: "Desserts",
    name: "Kulfi Falooda",
    description:
      "Traditional Indian kulfi served with sweet vermicelli and rose syrup.",
    price: 320,
    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/FOOD_CATALOG/IMAGES/CMS/2025/3/23/1dbdbf5f-5502-48e3-95fe-af5d119a11b4_12e9d9d5-7bcf-48a8-8430-c5902f9645cd.jpeg",
    tags: ["Vegetarian"],
  },
  {
    id: 17,
    category: "Desserts",
    name: "Kesar Rabri",
    description: "Thickened sweet milk flavored with saffron and cardamom.",
    price: 350,
    image:
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/08/rabri-rabdi.webp",
    tags: ["Vegetarian", "GF"],
  },
  {
    id: 18,
    category: "Desserts",
    name: "Mango Cheesecake",
    description:
      "Creamy mango-flavored cheesecake with a buttery biscuit base.",
    price: 380,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpyDRdk0pjyAHlDpAkA7mU_5xfvFaAUfAFLw&s",
    tags: ["Vegetarian"],
  },
];

const TABLES = [
  { id: 1, seats: 2, status: "available", position: "Window" },
  { id: 2, seats: 2, status: "occupied", position: "Window" },
  { id: 3, seats: 4, status: "available", position: "Center" },
  { id: 4, seats: 4, status: "available", position: "Center" },
  { id: 5, seats: 6, status: "available", position: "Booth" },
  { id: 6, seats: 8, status: "reserved", position: "Private" },
  { id: 7, seats: 2, status: "available", position: "Garden" },
  { id: 8, seats: 4, status: "available", position: "Garden" },
];

/**
 * REUSABLE ANIMATION COMPONENT
 */
const FadeIn = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setIsVisible(entry.isIntersecting));
    });
    const currentElement = domRef.current;
    if (currentElement) observer.observe(currentElement);
    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/**
 * MAIN APP COMPONENT
 */
const App = () => {
  const [activeCategory, setActiveCategory] = useState("Starters");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Reservation State
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    guests: "2",
  });
  const [selectedTable, setSelectedTable] = useState(null);
  const [preOrderCart, setPreOrderCart] = useState({}); // { itemId: quantity }

  // Modal State for confirmation pop-up
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({}); // { name, date, time, table, guests, orderedItems, total }

  // Handle Scroll for Navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const updateCart = (itemId, change) => {
    setPreOrderCart((prev) => {
      const currentQty = prev[itemId] || 0;
      const newQty = Math.max(0, currentQty + change);
      if (newQty === 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: newQty };
    });
  };

  const getCartTotal = () => {
    return Object.entries(preOrderCart).reduce((total, [id, qty]) => {
      const item = MENU_ITEMS.find((i) => i.id === parseInt(id));
      return total + (item ? item.price * qty : 0);
    }, 0);
  };

  // const handleReservationSubmit = (e) => {
  //   e.preventDefault();
  //   if (!selectedTable) {
  //     // Use the console for error checking
  //     console.error("Please select a table to complete your reservation.");
  //     return;
  //   }

  //   // Format ordered items for the modal
  //   const orderedItems = Object.entries(preOrderCart).map(([id, qty]) => {
  //     const item = MENU_ITEMS.find(i => i.id === parseInt(id));
  //     return { name: item.name, qty, price: item.price, subtotal: item.price * qty };
  //   });

  //   const total = getCartTotal();
  //   const tableInfo = TABLES.find(t => t.id === selectedTable);

  //   // --- Mock Email Content for Owner ---
  //   const ownerEmail = {
  //       // OWNER EMAIL UPDATED HERE
  //       to: "4hafeez003@gmail.com",
  //       subject: `New Reservation from ${formData.name}`,
  //       body: `
  //           Reservation Details:
  //           - Name: ${formData.name}
  //           - Date: ${formData.date}
  //           - Time: ${formData.time}
  //           - Guests: ${formData.guests}
  //           - Table ID: ${selectedTable} (${tableInfo.position}, ${tableInfo.seats} Seats)

  //           Pre-order Details (Total: ₹${total}):
  //           ${orderedItems.map(item => `- ${item.qty}x ${item.name} (₹${item.subtotal})`).join('\n')}

  //           Status: Confirmed
  //       `
  //   };

  //   // Log to console to simulate sending the email to the owner
  //   console.log("--- SIMULATING EMAIL TO OWNER (Reservation Notification) ---");
  //   console.log(ownerEmail);
  //   console.log("----------------------------------------------------------");

  //   // Set modal content and show modal
  //   setModalContent({
  //     name: formData.name,
  //     date: formData.date,
  //     time: formData.time,
  //     table: selectedTable,
  //     guests: formData.guests,
  //     orderedItems: orderedItems,
  //     total: total,
  //   });

  //   setShowModal(true);

  //   // Reset form after successful submission
  //   setFormData({
  //       name: '',
  //       date: '',
  //       time: '',
  //       guests: '2'
  //   });
  //   setSelectedTable(null);
  //   setPreOrderCart({});
  // };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTable) {
      console.error("Please select a table to complete your reservation.");
      return;
    }

    // 1) Prepare booking data
    const orderedItems = Object.entries(preOrderCart).map(([id, qty]) => {
      const item = MENU_ITEMS.find((i) => i.id === parseInt(id));
      return {
        name: item.name,
        qty,
        price: item.price,
        subtotal: item.price * qty,
      };
    });

    const total = getCartTotal();
    const tableInfo = TABLES.find((t) => t.id === selectedTable);

    // 2) Build text summary for email
    const preOrderSummary = orderedItems.length
      ? orderedItems
          .map((item) => `- ${item.qty}x ${item.name} (₹${item.subtotal})`)
          .join("\n")
      : "No pre-ordered dishes";

    // 3) SEND EMAIL via EmailJS
    try {
      const result = await emailjs.send(
        "service_ny1x56j", // ⬅️ from EmailJS
        "template_xw8jv7c", // ⬅️ from EmailJS
        {
          // these names must match your template variables
          customer_name: formData.name,
          date: formData.date,
          time: formData.time,
          guests: formData.guests,
          table_id: selectedTable,
          table_position: tableInfo.position,
          table_seats: tableInfo.seats,
          pre_order_summary: preOrderSummary,
          pre_order_total: total,
        },
        "ZJcN2gU55PazP5kYC" // ⬅️ EmailJS public key
      );

      console.log("✅ EmailJS success:", result.text);
    } catch (error) {
      console.error("❌ Failed to send email via EmailJS:", error);
    }

    // 4) Show modal as you already do
    setModalContent({
      name: formData.name,
      date: formData.date,
      time: formData.time,
      table: selectedTable,
      guests: formData.guests,
      orderedItems: orderedItems,
      total: total,
    });

    setShowModal(true);

    // 5) Reset form state
    setFormData({
      name: "",
      date: "",
      time: "",
      guests: "2",
    });
    setSelectedTable(null);
    setPreOrderCart({});
  };

  // Function to handle closing the modal and redirecting
  const handleDone = () => {
    setShowModal(false);
    // Redirect to the home section of the single-page application
    window.location.hash = "#home";
  };

  const filteredMenu = MENU_ITEMS.filter(
    (item) => item.category === activeCategory
  );

  return (
    <div className="font-sans text-stone-800 bg-stone-50 selection:bg-amber-200">
      {/* --- NAVIGATION --- */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-sm shadow-lg py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <ChefHat
              className={`w-8 h-8 ${
                isScrolled ? "text-amber-600" : "text-amber-500"
              }`}
            />
            <span
              className={`text-2xl font-serif font-bold tracking-wider ${
                isScrolled ? "text-stone-900" : "text-white"
              }`}
            >
              MY RESTAURANT
            </span>
          </div>

          {/* Desktop Menu */}
          <div
            className={`hidden md:flex items-center gap-8 font-medium ${
              isScrolled ? "text-stone-600" : "text-stone-200"
            }`}
          >
            <a href="#home" className="hover:text-amber-500 transition-colors">
              Home
            </a>
            <a href="#about" className="hover:text-amber-500 transition-colors">
              About
            </a>
            <a href="#menu" className="hover:text-amber-500 transition-colors">
              Menu
            </a>
            <a
              href="#contact"
              className="px-6 py-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-all shadow-lg hover:shadow-amber-500/30"
            >
              Book a Table
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-amber-500"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl py-8 px-6 flex flex-col gap-6 text-center border-t">
            <a
              href="#home"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-stone-800"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-stone-800"
            >
              About
            </a>
            <a
              href="#menu"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-stone-800"
            >
              Menu
            </a>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-amber-600"
            >
              Book Reservation
            </a>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2000"
            alt="Restaurant Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-stone-900/90"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <FadeIn>
            <span className="text-amber-400 font-serif italic text-xl md:text-2xl mb-4 block">
              Taste the Extraordinary
            </span>
          </FadeIn>
          <FadeIn delay={200}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight">
              Welcome to{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 to-amber-500">
                MyRestaurant
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay={400}>
            <p className="text-stone-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Experience a symphony of flavors in the heart of the city. Modern
              gastronomy meets timeless tradition.
            </p>
          </FadeIn>
          <FadeIn delay={600}>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a
                href="#menu"
                className="px-8 py-4 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition-all hover:scale-105 shadow-lg shadow-amber-900/20"
              >
                View Our Menu
              </a>
              <a
                href="#contact"
                className="px-8 py-4 bg-transparent border border-white text-white rounded-full font-medium hover:bg-white hover:text-stone-900 transition-all hover:scale-105"
              >
                Reserve a Table
              </a>
            </div>
          </FadeIn>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
          <ArrowRight className="rotate-90 w-6 h-6" />
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-24 px-6 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-amber-500 hidden md:block"></div>
                <img
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1000"
                  alt="Chef plating dish"
                  className="rounded-lg shadow-2xl w-full object-cover h-[500px]"
                />
              </div>
            </FadeIn>

            <div className="space-y-6">
              <FadeIn delay={200}>
                <div className="flex items-center gap-2 text-amber-600 font-semibold uppercase tracking-wider text-sm">
                  <Utensils size={16} />
                  <span>Our Story</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-tight">
                  Crafting Memories on Every Plate
                </h2>
              </FadeIn>
              <FadeIn delay={300}>
                <p className="text-stone-600 leading-relaxed text-lg">
                  Founded in 2010, MyRestaurant was born from a passion for authentic
                  flavors and sustainable sourcing. Executive Chef Andre Dubois
                  brings over 20 years of global culinary experience.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* --- MENU SECTION --- */}
      <section id="menu" className="py-24 bg-stone-900 text-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                Our Menu
              </h2>
              <p className="text-stone-400 max-w-2xl mx-auto">
                A carefully curated selection of seasonal dishes, prepared with
                passion and precision.
              </p>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="flex flex-wrap justify-center gap-4 mt-10">
                {["Starters", "Mains", "Desserts"].map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-8 py-3 rounded-full transition-all duration-300 text-lg font-medium ${
                      activeCategory === category
                        ? "bg-amber-600 text-white shadow-lg shadow-amber-900/50 scale-105"
                        : "bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-white"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMenu.map((item, index) => (
              <FadeIn key={item.id} delay={index * 100}>
                <div className="group bg-stone-800 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-black/50 transition-all duration-500 h-full flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-stone-900 font-bold px-4 py-1 rounded-full text-sm shadow-lg">
                      ₹{item.price}
                    </div>
                  </div>
                  <div className="p-6 grow flex flex-col">
                    <h3 className="text-xl font-bold font-serif text-amber-100 group-hover:text-amber-500 transition-colors mb-2">
                      {item.name}
                    </h3>
                    <p className="text-stone-400 text-sm mb-4 leading-relaxed grow">
                      {item.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- RESERVATION & CONTACT --- */}
      <section id="contact" className="py-24 px-6 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
            {/* Contact Info Side */}
            <div className="lg:w-1/3 bg-stone-900 text-stone-100 p-10 lg:p-12 flex flex-col justify-between relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600 rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
              <div>
                <h3 className="text-3xl font-serif font-bold mb-8 text-white">
                  Contact Us
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="text-amber-500 mt-1 shrink-0" />
                    <p className="text-stone-400">
                      Cantonment,Ballari
                      <br />
                      Karnataka, KA 583104
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="text-amber-500 mt-1 shrink-0" />
                    <p className="text-stone-400">+91 8867880847</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Form Side */}
            <div className="lg:w-2/3 p-10 lg:p-12 bg-white">
              <h3 className="text-3xl font-serif font-bold text-stone-900 mb-2">
                Book a Table
              </h3>
              <p className="text-stone-500 mb-8">
                Select your table, pre-order dishes, and reserve instantly.
              </p>

              <form onSubmit={handleReservationSubmit} className="space-y-8">
                {/* Step 1: Guest Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-stone-50 border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">
                      Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-stone-50 border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                        value={formData.date}
                        onChange={(e) =>
                          setFormData({ ...formData, date: e.target.value })
                        }
                      />
                      <Calendar
                        className="absolute right-4 top-3 text-stone-400 pointer-events-none"
                        size={20}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">
                      Time
                    </label>
                    <div className="relative">
                      <select
                        required
                        className="w-full px-4 py-3 rounded-lg bg-stone-50 border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all appearance-none"
                        value={formData.time}
                        onChange={(e) =>
                          setFormData({ ...formData, time: e.target.value })
                        }
                      >
                        <option value="">Select Time</option>
                        <option value="17:00">5:00 PM</option>
                        <option value="18:00">6:00 PM</option>
                        <option value="19:00">7:00 PM</option>
                        <option value="20:00">8:00 PM</option>
                        <option value="21:00">9:00 PM</option>
                      </select>
                      <Clock
                        className="absolute right-4 top-3 text-stone-400 pointer-events-none"
                        size={20}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">
                      Guests
                    </label>
                    <select
                      className="w-full px-4 py-3 rounded-lg bg-stone-50 border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                      value={formData.guests}
                      onChange={(e) =>
                        setFormData({ ...formData, guests: e.target.value })
                      }
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, "9+"].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Person" : "People"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="border-t border-stone-200 my-6"></div>

                {/* Step 2: Table Selection */}
                <div>
                  <h4 className="font-bold text-stone-800 mb-4 flex items-center gap-2">
                    <Users size={18} className="text-amber-600" />
                    Select Your Table
                  </h4>
                  <div className="grid grid-cols-4 gap-4">
                    {TABLES.map((table) => (
                      <button
                        key={table.id}
                        type="button"
                        disabled={
                          table.status === "occupied" ||
                          table.status === "reserved"
                        }
                        onClick={() => setSelectedTable(table.id)}
                        className={`relative p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${
                          selectedTable === table.id
                            ? "border-amber-600 bg-amber-50 text-amber-800"
                            : table.status !== "available"
                            ? "border-stone-100 bg-stone-100 text-stone-400 cursor-not-allowed opacity-60"
                            : "border-stone-200 hover:border-amber-300 hover:bg-amber-50/50 text-stone-600"
                        }`}
                      >
                        <span className="text-xs font-bold uppercase tracking-wider">
                          {table.position}
                        </span>
                        <div className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center font-bold text-lg">
                          {table.id}
                        </div>
                        <span className="text-xs">{table.seats} Seats</span>
                        {selectedTable === table.id && (
                          <div className="absolute -top-2 -right-2 bg-amber-600 text-white rounded-full p-1">
                            <CheckCircle size={14} />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-4 text-xs text-stone-500">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 border border-stone-300 rounded-sm"></div>{" "}
                      Available
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 border border-amber-600 bg-amber-50 rounded-sm"></div>{" "}
                      Selected
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-stone-100 border border-stone-100 rounded-sm"></div>{" "}
                      Occupied
                    </div>
                  </div>
                </div>

                <div className="border-t border-stone-200 my-6"></div>

                {/* Step 3: Pre-order Food */}
                <div>
                  <h4 className="font-bold text-stone-800 mb-4 flex items-center gap-2">
                    <Utensils size={18} className="text-amber-600" />
                    Pre-order Dishes (Optional)
                  </h4>
                  <div className="bg-stone-50 rounded-xl p-6 border border-stone-100 h-80 overflow-y-auto custom-scrollbar">
                    {MENU_ITEMS.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center py-3 border-b border-stone-200 last:border-0"
                      >
                        <div className="flex gap-3 items-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-bold text-sm text-stone-800">
                              {item.name}
                            </p>
                            <p className="text-xs text-stone-500">
                              ₹{item.price}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => updateCart(item.id, -1)}
                            className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-500 hover:bg-stone-100"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-6 text-center font-medium">
                            {preOrderCart[item.id] || 0}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateCart(item.id, 1)}
                            className="w-8 h-8 rounded-full bg-amber-600 text-white border border-amber-600 flex items-center justify-center hover:bg-amber-700"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {getCartTotal() > 0 && (
                    <div className="mt-4 p-4 bg-amber-50 rounded-lg flex justify-between items-center text-amber-900">
                      <span className="font-medium">
                        Estimated Pre-order Total:
                      </span>
                      <span className="font-bold text-xl">
                        ₹{getCartTotal()}
                      </span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700 transition-colors shadow-lg shadow-amber-600/30 text-lg flex justify-center items-center gap-2"
                >
                  <Calendar size={20} />
                  Confirm Reservation{" "}
                  {getCartTotal() > 0 && `(₹${getCartTotal()} Pre-order)`}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-stone-950 text-stone-400 py-12 px-6 border-t border-stone-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <ChefHat className="text-amber-600" />
            <span className="text-2xl font-serif font-bold text-white">
             MY RESTAURANT
            </span>
          </div>
          <div className="text-sm">
            © {new Date().getFullYear()} MYRestaurant. All rights
            reserved.
          </div>
        </div>
      </footer>

      {/* --- CONFIRMATION MODAL --- */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-9999 flex items-center justify-center p-4"
          onClick={handleDone}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-lg w-full transform transition-all scale-100 opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-amber-600 p-6 rounded-t-xl flex items-center gap-3">
              <CheckCircle size={32} className="text-white" />
              <h4 className="text-2xl font-serif font-bold text-white">
                Reservation Confirmed!
              </h4>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* Main Details */}
              <div className="grid grid-cols-2 gap-y-3 text-stone-700">
                <p className="font-semibold flex items-center gap-2">
                  <Calendar size={18} className="text-amber-500" /> Date & Time:
                </p>
                <p className="text-right font-medium">
                  {modalContent.date} at {modalContent.time}
                </p>

                <p className="font-semibold flex items-center gap-2">
                  <Users size={18} className="text-amber-500" /> Guests & Table:
                </p>
                <p className="text-right font-medium">
                  {modalContent.guests} people / Table #{modalContent.table}
                </p>
              </div>

              {/* Pre-order Section */}
              {modalContent.orderedItems &&
                modalContent.orderedItems.length > 0 && (
                  <div className="border-t border-b border-stone-200 py-4">
                    <h5 className="font-bold text-lg text-stone-800 mb-3 flex items-center gap-2">
                      <Utensils size={18} className="text-amber-600" />{" "}
                      Pre-order Summary
                    </h5>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {modalContent.orderedItems.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between text-sm text-stone-600"
                        >
                          <span>
                            {item.qty}x {item.name}
                          </span>
                          <span>₹{item.subtotal}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 mt-3 border-t border-stone-300 flex justify-between items-center font-bold text-stone-900">
                      <span>Estimated Total:</span>
                      <span className="text-xl text-amber-600">
                        ₹{modalContent.total}
                      </span>
                    </div>
                  </div>
                )}

              <p className="text-sm text-stone-500 italic">
                {/* A confirmation email has been sent to your inbox. The restaurant
                owner (<span className="font-mono">4hafeez003@gmail.com</span>)
                has also been notified of table #{modalContent.table}. */}
                Your table is now reserved! We’ve sent a confirmation email with all the details.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-stone-50 rounded-b-xl flex justify-end">
              <button
                type="button"
                onClick={handleDone}
                className="px-6 py-2 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
