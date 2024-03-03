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
  