
import { LucideIcon, Code, ShoppingCart, ShoppingBag, Store, Package, StoreSquare } from "lucide-react";

export interface PlatformDetail {
  name: string;
  logo: string | null;
  color: string;
  icon: LucideIcon;
  description: string;
}

export const platformDetails: Record<string, PlatformDetail> = {
  shopify: {
    name: "Shopify",
    logo: "https://cdn.worldvectorlogo.com/logos/shopify.svg",
    color: "#7AB55C",
    icon: ShoppingBag,
    description: "Connect your Shopify store to track sales and customer data."
  },
  woocommerce: {
    name: "WooCommerce",
    logo: "https://cdn.worldvectorlogo.com/logos/woocommerce.svg",
    color: "#7F54B3",
    icon: ShoppingCart,
    description: "Integrate with your WooCommerce WordPress store."
  },
  magento: {
    name: "Magento",
    logo: "https://cdn.worldvectorlogo.com/logos/magento.svg",
    color: "#F26322",
    icon: Store,
    description: "Connect your Magento e-commerce platform."
  },
  bigcommerce: {
    name: "BigCommerce",
    logo: "https://cdn.worldvectorlogo.com/logos/bigcommerce.svg",
    color: "#34313F",
    icon: StoreSquare,
    description: "Track sales data from your BigCommerce store."
  },
  prestashop: {
    name: "PrestaShop",
    logo: "https://cdn.worldvectorlogo.com/logos/prestashop.svg",
    color: "#DF0067",
    icon: Package,
    description: "Connect your PrestaShop online store."
  },
  custom: {
    name: "Custom Platform",
    logo: null,
    color: "#64748B",
    icon: Code,
    description: "Connect any custom e-commerce platform with our API."
  }
};
