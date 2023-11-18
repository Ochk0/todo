"use client"

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from '@dnd-kit/modifiers';
import { useEffect, useState } from 'react';
import SortableLinks from '@/components/SortableLinks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AddNewItem } from '@/components/AddNewItem';
import { updateTasks, fetchTasks } from '@/firebase/queries/todoListQueries';

interface Item {
  name: string;
  id: number;
  isDone: boolean
}

const Home = () => {
  //isdone
  //zasah
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetchTasks(setItems)
  }, [])

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);
    updateTasks(arrayMove(items, oldIndex, newIndex))
    if (active.id !== over.id) {
      setItems((prevItems) => {
        return arrayMove(prevItems, oldIndex, newIndex);
      });
    }
  }

  const handleDelete = (idToDelete: number) => {
    const newItems = items.filter((item) => item.id !== idToDelete)
    setItems(newItems);
    updateTasks(newItems)
  }
  const handleDone = (idToMakeDone: number) => {
    const updatedItems = items.map(item => {
      if (item.id === idToMakeDone) {
        return { ...item, isDone: true };
      }
      return item;
    });
    setItems(updatedItems);
    updateTasks(updatedItems);
  }
  let idx = Date.now();

  const addNewItem = (newItem: string) => {
    setItems((prevItems) => [...prevItems, { name: newItem, id: idx, isDone: false }]);
    updateTasks([...items, { name: newItem, id: idx, isDone: false }])
  }
  const handleEdit = (idToEdit: number, newItemValue: Item) => {
    const updatedItems = items.map(item =>
      item.id === idToEdit ? newItemValue : item
    );
    setItems(updatedItems)
    updateTasks(updatedItems)
  }

  return (
    <main className='flex justify-center items-center h-screen px-2 mx-auto select-none'>
      <Card className='w-full md:max-w-lg'>
        <CardHeader className='space-y-1 '>
          <CardTitle className='text-2xl flex justify-between'>
            TODO app
            <AddNewItem addNewItem={addNewItem} />
          </CardTitle>
          <CardDescription>My TODO list for morphosis</CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
          >
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
              {items.map((item) => (
                <SortableLinks key={item.id} id={item} handleEdit={handleEdit} onDone={handleDone} onDelete={handleDelete} />
              ))}
            </SortableContext>
          </DndContext>
        </CardContent>
      </Card>
    </main>
  );
};

export default Home;
