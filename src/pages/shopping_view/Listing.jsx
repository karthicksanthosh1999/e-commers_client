import React, { useEffect, useState } from "react";
import ProductFilter from "./Filter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import { sortOptions } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts } from "@/features/slices/shop";
import ShoppingProductTile from "./ProductTile";
import { useSearchParams } from "react-router-dom";

const createSearchParamsHelper = (filterParams) => {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("&");
};

const ShoppingListing = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.shopProducts);

  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);

  const handleSort = (values) => {
    setSort(values);
  };

  const handleFilter = (getSelectionId, getCurrentOption) => {
    console.log(getCurrentOption, getSelectionId);
    let cpyFilters = { ...filters };
    let indexOfCurrentSeciton = Object.keys(cpyFilters).indexOf(getSelectionId);
    if (indexOfCurrentSeciton === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSelectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSelectionId].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1) {
        cpyFilters[getSelectionId].push(getCurrentOption);
      } else {
        cpyFilters[getSelectionId].splice(indexOfCurrentOption, 1);
      }
    }
    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  };

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")));
  }, []);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
  }, [dispatch, sort, filters]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span>{productList.length} Products</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1">
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                      className="cursor-pointer">
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-3">
          {productList && productList.length > 0 ? (
            productList.map((product, index) => (
              <ShoppingProductTile key={index} product={product} />
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingListing;
