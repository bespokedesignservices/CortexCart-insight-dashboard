
import { LucideIcon, Code, ShoppingCart, ShoppingBag, Store, Package, Building, Globe } from "lucide-react";

export interface PlatformDetail {
  name: string;
  logo: string | null;
  color: string;
  icon: LucideIcon;
  description: string;
  instructions?: string;
  settingsUrl?: string;
}

export const platformDetails: Record<string, PlatformDetail> = {
  shopify: {
    name: "Shopify",
    logo: "https://cdn.worldvectorlogo.com/logos/shopify.svg",
    color: "#7AB55C",
    icon: ShoppingBag,
    description: "Connect your Shopify store to track sales and customer data.",
    instructions: "Add this code to the theme.liquid file just before the closing </head> tag.",
    settingsUrl: "https://admin.shopify.com/themes/current/editor"
  },
  woocommerce: {
    name: "WooCommerce",
    logo: "https://cdn.worldvectorlogo.com/logos/woocommerce.svg",
    color: "#7F54B3",
    icon: ShoppingCart,
    description: "Integrate with your WooCommerce WordPress store.",
    instructions: "Add this code to your WordPress theme's header.php file or use a header script plugin.",
    settingsUrl: "https://yourstore.com/wp-admin/admin.php?page=wc-settings"
  },
  magento: {
    name: "Magento",
    logo: "https://cdn.worldvectorlogo.com/logos/magento.svg",
    color: "#F26322",
    icon: Store,
    description: "Connect your Magento e-commerce platform.",
    instructions: "Add this code to the default_head_blocks.xml file in your theme.",
    settingsUrl: "https://yourstore.com/admin/system/config"
  },
  bigcommerce: {
    name: "BigCommerce",
    logo: "https://cdn.worldvectorlogo.com/logos/bigcommerce.svg",
    color: "#34313F",
    icon: Building,
    description: "Track sales data from your BigCommerce store.",
    instructions: "Add this code to your BigCommerce store's script manager.",
    settingsUrl: "https://login.bigcommerce.com/deep-links/settings"
  },
  prestashop: {
    name: "PrestaShop",
    logo: "https://cdn.worldvectorlogo.com/logos/prestashop.svg",
    color: "#DF0067",
    icon: Package,
    description: "Connect your PrestaShop online store.",
    instructions: "Add this code to the header.tpl file in your theme folder.",
    settingsUrl: "https://yourstore.com/admin-dev/index.php/configure/advanced/performance"
  },
  opencart: {
    name: "OpenCart",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/OpenCart_logo.png",
    color: "#0C9EDB",
    icon: Globe,
    description: "Integrate with your OpenCart e-commerce platform.",
    instructions: "Add this code to the header.tpl file in your theme's template folder.",
    settingsUrl: "https://yourstore.com/admin/index.php?route=setting/setting"
  },
  custom: {
    name: "Custom Platform",
    logo: null,
    color: "#64748B",
    icon: Code,
    description: "Connect any custom e-commerce platform with our API.",
    instructions: "Add this code to your website's HTML, just before the closing </head> tag.",
  }
};
