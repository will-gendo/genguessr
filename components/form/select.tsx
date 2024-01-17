"use client";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import React from "react";

type SelectItemParams = {
  title: string;
  value: string;
};

export type SelectBlockProps = {
  items: SelectItemParams[];
  label: string;
  onChange: (value: string) => void;
};

const SelectBlock: React.FC<SelectBlockProps> = (props: SelectBlockProps) => {
  const { items, label, onChange } = props;

  return (
    <div className="px-4 w-full lg:w-48 flex flex-col gap-4">
      <div className="flex flex-row items-center gap-2">
        <Select.Root
          onValueChange={(value: string) => onChange(value)}
          defaultValue={items[0].value}
        >
          <Select.Trigger
            className="flex-row justify-between border-solid border border-gendo-grey-light/20  inline-flex items-center  rounded px-2 text-sm  text-white leading-none h-[32px] gap-[4px] hover:bg-white/10 focus:border-gendo-grey-light/70 outline-none w-full text-left"
            aria-label={label}
          >
            <Select.Value placeholder="Select" />
            <Select.Icon className="text-white">
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="overflow-hidden bg-black rounded">
              <Select.Viewport className="p-[4px]">
                <Select.Group className="text-sm text-white">
                  {items.map((item) => {
                    const { title: itemTitle, value } = item;
                    return (
                      <Select.Item
                        key={value}
                        value={value}
                        className="text-sm text-white rounded flex items-center h-[32px] relative p-2 select-none data-[highlighted]:outline-none data-[highlighted]:bg-white/10"
                      >
                        <Select.ItemText>
                          {itemTitle.toUpperCase()}
                        </Select.ItemText>
                        <Select.ItemIndicator className="absolute right-0 w-[25px] inline-flex items-center justify-center">
                          <CheckIcon />
                        </Select.ItemIndicator>
                      </Select.Item>
                    );
                  })}
                </Select.Group>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
    </div>
  );
};

export default SelectBlock;
