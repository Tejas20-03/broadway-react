export type MenuItem = {
  ID: string;
  Name: string;
  Description: string;
  ImageBase64: string;
  IsActive: boolean;
  ItemImage: null;
  CategoryID: string;
  IsDiscountApplicable: boolean;
  CategoryName: string;
  MenuID: string;
  MinDeliveryPrice: number;
  TakeawayPrice: number;
  DiscountedPrice: number;
  Discount: number;
  DiscountPercentage: number;
  DiscountPercentageTakeaway: number;
  MinimumDelivery: string;
  MenuSizesList: null;
  SizeID: string;
  Serving: string;
  SpecialDeal: boolean;
  SpecialDealText: string;
  Timer: boolean;
  EndTime: string;
  IsNewItem: boolean;
  Whatsapplink: string;
  PaymentType: string;
};

export type MenuCategory = {
  ID: string;
  menuID: string;
  Name: string;
  Description: string | null;
  Order: string;
  StartTime: string;
  EndTime: string;
  IsActive: boolean;
  ParentCategoryID: string;
  MenuItemsList: MenuItem[];
};

export type NestedMenu = {
  ID: string;
  Name: string;
  Description: string;
  MenuID: string;
  VendorID: string;
  OutletID: string | null;
  MenuCategoryList: MenuCategory[];
};

export type GetMenuResponse = {
  ResponseType: number;
  OutletID: string | null;
  delivery_tax: number | null;
  delivery_fees: number | null;
  Area: string | null;
  Data: {
    NestedMenuForMobile: NestedMenu[];
  };
};

export type MenuItemOption = {
  ID: number;
  Name: string;
  Description: string;
  RemoteCode: string;
  Price: number;
  OriginalPrice: number;
  Discount: number;
  ItemImage: string;
  IsActive: boolean;
  IsNewItem: boolean;
  MultiSelect: boolean;
  ActualPrice: string;
};

export type MenuItemFlavourAndTopping = {
  ID: number;
  Name: string;
  Description: string;
  RemoteCode: string;
  Price: number;
  IsActive: boolean;
  IsMultiple: boolean;
  SortOrder: number;
  OptionsList: MenuItemOption[];
};

export type MenuItemSize = {
  ID: number;
  MenuItemID: number;
  LinkedMenuSizeID: number;
  Size: string;
  DineInPrice: number;
  ActualPrice: number;
  DeliveryPrice: number;
  TakeAwayPrice: number;
  MinDeliveryPrice: number;
  DiscountedPrice: number;
  Discount: number;
  RemoteCode: string;
  Recipe: string;
  IsHalfnHalf: boolean;
  IsPizza: boolean;
  PizzaTypeID: number;
  PizzaType: string;
  IsDiscountApplicable: boolean;
  OptionGroupsList: null; // You can specify the type if you have more data here
  MaterialsList: null; // You can specify the type if you have more data here
  FlavourAndToppingsList: MenuItemFlavourAndTopping[];
};

export type MenuItemData = {
  ID: number;
  Name: string;
  Description: string;
  ImageBase64: string;
  IsActive: boolean;
  ItemImage: string;
  CategoryID: number;
  IsDiscountApplicable: boolean;
  CategoryName: string;
  Whatsapplink: string;
  MenuID: number;
  MinDeliveryPrice: number;
  DiscountedPrice: number;
  Discount: number;
  MinimumDelivery: number;
  MenuSizesList: MenuItemSize[];
  PaymentType: string;
};

export type MenuItemResponse = {
  ResponseType: number;
  Data: MenuItemData;
};

export type MenuImageResponse = {
  ResponseType: 1 | 0;
  Data: {
    value: string;
  }[];
};

export type WelcomePopupResponse =
  | {
      responseType: 1 | 0;
      Data: string;
      Link: string;
      Link1: string;
    }
  | undefined;

export type PizzaArticle = {
  Title: string;
  Slug: string;
};

export type PizzaArticlesResponse = {
  ResponseType: number;
  Data: PizzaArticle[];
};

export type BlogType = {
  ID: string;
  Title: string;
  Blog: string;
  Author: string;
  City: string;
  CoverImage: string;
  OldSlug: string;
  Video: string;
  Categories: string;
  Slug: string;
  BlogOutlets: string;
  IsActive: string;
  CreatedDate: string;
  CreatedBy: string;
  ModifiedDate: string;
  ModifiedBy: string;
  CoverImageName: string;
  IsNewsLetterEnable: string;
};

export type BlogResponse_Type = {
  ResponseType: number;
  Data: BlogType[];
};
