import React from 'react'; 



export type NavItemType = {
id: number;
title: string;
url: string;
}

export type NavListType= NavItemType[];

export interface NavProps {
    handleMenuToggle: () => void;
  }
export interface CartProps {
    handleToggleCart: () => void;
  }
  
  export interface product {
id: number,
title:string,
desc:string,
price:number
  } 
