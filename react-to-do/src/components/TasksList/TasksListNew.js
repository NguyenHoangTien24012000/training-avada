// import {
//   ResourceList,
//   ResourceItem,
//   TextStyle,
//   Card,
//   Button,
//   ButtonGroup,
//   Stack,
//   Badge,
//   Page,
// } from "@shopify/polaris";
// import { useState } from "react";

// export function TaskListNew() {
//   const [selectedItems, setSelectedItems] = useState([]);

//   const resourceName = {
//     singular: "customer",
//     plural: "customers",
//   };

//   const items = [
//     {
//       id: "103",
//       url: "#",
//       name: "Mae Jemison",
//       location: "Decatur, USA",
//     },
//     {
//       id: "203",
//       url: "#",
//       name: "Ellen Ochoa",
//       location: "Los Angeles, USA",
//     },
//   ];

//   const promotedBulkActions = [
//     {
//       content: "Edit customers",
//       onAction: () => console.log("Todo: implement bulk edit"),
//     },
//     {
//       content: "Edit customers",
//       onAction: () => console.log("Todo: implement bulk edit"),
//     },
//   ];

//   return (
//     <Card>
//        <Page fullWidth={false} title="ToDoes"/>
//       <ResourceList
//         resourceName={resourceName}
//         items={items}
//         renderItem={renderItem}
//         selectedItems={selectedItems}
//         onSelectionChange={setSelectedItems}
//         promotedBulkActions={promotedBulkActions}
//       />
//     </Card>
//   );

//   function renderItem(item) {

//     const { id, url, name, location } = item;

//     return (
//       <ResourceItem id={id}>
//         <Stack distribution="equalSpacing">
//           <TextStyle>{name}</TextStyle>
//           <ButtonGroup>
//           <Badge>Fulfilled</Badge>
//             <Button onClick={()=>{}} loading={false}>
//               {false ? "Undo" : "Complete"}
//             </Button>
//             <Button destructive onClick={()=>{}} loading={false}>
//               Delete
//             </Button>
//           </ButtonGroup>
//         </Stack>
//       </ResourceItem>
//     );
//   }
// }

import React from "react";
import "./TaskList.css";
import { HocComponentTaskList } from "../../utils/HOCs/HocNew";
import { Page } from "@shopify/polaris";

function tasksList(props) {
  return <h1 className="title-list">Tasks</h1>;
}
const statusListTaskCurrent = false;
export const TasksListNew = HocComponentTaskList(
  tasksList,
  statusListTaskCurrent
);
