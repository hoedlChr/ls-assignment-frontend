import {Box, Button, Card, CardContent, Checkbox, Stack, Typography} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import React, {useState} from "react";

export function Kanban() {
    const [items, setItems] = useState([
        [
            {id: 11, content: <KanbanItem name="11"/>},
            {id: 12, content: <KanbanItem name="12"/>},
            {id: 13, content: <KanbanItem name="13"/>},
        ],
        [
            {id: 21, content: <KanbanItem name="21"/>},
            {id: 22, content: <KanbanItem name="22"/>},
            {id: 23, content: <KanbanItem name="23"/>},
        ],
        [
            {id: 31, content: <KanbanItem name="31"/>},
            {id: 32, content: <KanbanItem name="32"/>},
            {id: 33, content: <KanbanItem name="33"/>},
        ],

    ])
    const onDragEnd = (result: any) => {
        let itemsCopy = items;
        itemsCopy[parseInt(result.destination.droppableId)].
        splice(result.destination.index, 0, items[parseInt(result.source.droppableId)].splice(result.source.index, 1)[0]);
        setItems([...itemsCopy]);
    };
    return (
        <Box sx={{paddingBottom: 4}}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Stack spacing={2} margin={5} direction="row">
                    {items.map((list,listIndex) => (
                    <Droppable droppableId={listIndex.toString()}>
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                <KanbanList>
                                {
                                    list.map((item, index) => (
                                        <Draggable key={item.id} draggableId={"dragable-"+item.id} index={index}>
                                            {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                {item.content}
                                            </div>
                                            )}
                                        </Draggable>
                                    ))
                                }

                    <Button onClick={()=>{
                        let itemsCopy = [...items];
                        let allIds :number[] = itemsCopy.flat().map((item)=>item.id);
                        let highestId :number= allIds.reduce((prev, current) => (prev > current) ? prev : current);
                        highestId++;
                        
                        itemsCopy[listIndex].push({id: highestId, content: <KanbanItem name={highestId.toString()}/>}); 
                        setItems(itemsCopy)
                        }}>Add item</Button>
                                </KanbanList>
                        {provided.placeholder}
                        </div>
                        )}
                    </Droppable>
                        ))}
                        </Stack>
            </DragDropContext>
        </Box>
    );
}

function KanbanItem({name}: { name: string }) {
    return (
        <Card>
            <CardContent>
                <Stack spacing={2} direction="row" alignItems="center">
                    <Checkbox/>
                    <Typography variant="h6">Some item {name}</Typography>
                </Stack>
            </CardContent>
        </Card>
    );
}

function KanbanList({children}: { children: React.ReactNode }) {
    return (
        <Card variant="outlined" sx={{bgcolor: 'grey.200', width: 400}}>
            <CardContent>
                <Stack spacing={2}>
                    {children}
                </Stack>
            </CardContent>
        </Card>
    );
}

export default Kanban;