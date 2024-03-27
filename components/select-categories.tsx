import React from "react";

import { ProductCategories } from "@/types/product";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectCategories = ({ ...field }) => {
  return (
    <>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Kategorija" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ProductCategories.PATULJAK}>
            {ProductCategories.PATULJAK}
          </SelectItem>
          <SelectItem value={ProductCategories.VIJENAC}>
            {ProductCategories.VIJENAC}
          </SelectItem>
          <SelectItem value={ProductCategories.OSTALO}>
            {ProductCategories.OSTALO}
          </SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};

export default SelectCategories;
