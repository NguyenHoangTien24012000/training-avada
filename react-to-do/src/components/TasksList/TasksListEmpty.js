import { Card, EmptyState } from "@shopify/polaris";
import React from "react";

//@hoangtien empty này mình thấy có bọc card ở bên ngoài rồi nếu trong này có card nữa border nó bị đè lên nhau ấy. Với phần này k có thẻ nào bên trong thì đóng thẻ luôn ntn nhé <EmptyState/>
export function TasksListEmpty() {
  return (
    <Card sectioned>
      <EmptyState
        heading="Empty Task"
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        fullWidth
      ></EmptyState>
    </Card>
  );
}
