
export interface PlatformDetail {
  name: string;
  logo: string | null;
  instructions: string;
  settingsUrl: string;
}

export const platformDetails: Record<string, PlatformDetail> = {
  shopify: {
    name: "Shopify",
    logo: "https://cdn.shopify.com/s/files/1/0277/3365/8563/files/shopify-logo.svg",
    instructions: "Add the tracking code to the theme.liquid file just before the closing </head> tag.",
    settingsUrl: "https://your-store.myshopify.com/admin/themes/current/editor?section=theme-settings",
  },
  amazon: {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    instructions: "Amazon doesn't allow custom JavaScript. Please use our API integration instead.",
    settingsUrl: "https://sellercentral.amazon.com/",
  },
  ebay: {
    name: "eBay",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg",
    instructions: "Add the tracking code to your eBay store's description template.",
    settingsUrl: "https://my.ebay.com/ws/eBayISAPI.dll?MyeBay",
  },
  woocommerce: {
    name: "WooCommerce",
    logo: "https://woocommerce.com/wp-content/themes/woo/images/logo-woocommerce.svg",
    instructions: "Add the tracking code to your theme's header.php file just before the closing </head> tag, or use a plugin like 'Insert Headers and Footers'.",
    settingsUrl: "https://your-site.com/wp-admin/admin.php?page=wc-settings",
  },
  magento: {
    name: "Magento",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Magento_logo.svg",
    instructions: "Add the tracking code to your theme's default_head_blocks.xml file.",
    settingsUrl: "https://your-site.com/admin/system/config/",
  },
  bigcommerce: {
    name: "BigCommerce",
    logo: "https://www.bigcommerce.com/assets/images/logos/bigcommerce-logo-dark.svg",
    instructions: "Add the tracking code in Settings > Advanced Settings > Web Analytics.",
    settingsUrl: "https://login.bigcommerce.com/",
  },
  custom: {
    name: "Custom Platform",
    logo: null,
    instructions: "Add the tracking code just before the closing </head> tag of your website.",
    settingsUrl: "",
  }
};
