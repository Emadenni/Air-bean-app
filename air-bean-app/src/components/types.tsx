import React from "react";

export type NavItemType = {
  id: number;
  title: string;
  url: string;
};

export type NavListType = NavItemType[];

export interface NavProps {
  handleMenuToggle: () => void;
}
export interface CartProps {
  handleToggleCart: () => void;
}

export interface product {
  id: string;
  title: string;
  desc: string;
  price: number;
}

export interface cartProduct {
  id: string;
  title: string;
  price: number;
  quantity:number;
}

export interface CountState {
  count: number;
  increment: () => void;
  decrement: () => void;
  resetCounts: () => void; 
}
export interface OrderState {
  eta: number,
  orderNr:string
  setOrderData: (eta:number, orderNr: string) => void; 
}

export interface User {
  name: string;
  email: string;
  username: string;
}

export type UserData = User[];


export interface Order {
  total: number;
  orderNr: string;
  orderDate: string;
}