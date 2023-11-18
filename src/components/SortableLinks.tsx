import React, { FC, useState } from 'react';
import { Card } from '@/components/ui/card';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Image from 'next/image'
import { Checkbox } from "@/components/ui/checkbox"

// import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@radix-ui/react-dialog';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Button } from './ui/button';
interface Item {
    id: number;
    name: string;
    isDone: boolean;
}

interface SortableLinkCardProps {
    id: Item;
    onDelete: (id: number) => void;
    onDone: (id: number) => void;
    handleEdit: (id: number, newItemValue: Item) => void;
}

const SortableLinks: FC<SortableLinkCardProps> = ({ id, onDelete, onDone, handleEdit }) => {
    const uniqueId = id.id;
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: uniqueId });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const [taskData, setTaskData] = useState({
        name: id.name,
        isDone: id.isDone,
        id: id.id,
    })
    const handleDeleteClick = () => {
        onDelete(uniqueId);
    };
    const handleDoneClick = () => {
        onDone(uniqueId)
    }
    const handleEditClick = () => {
        handleEdit(id.id, taskData)
    }

    const isCursorGrabbing = attributes['aria-pressed'];

    return (
        <div ref={setNodeRef} style={style} key={uniqueId}>
            <Dialog>
                <DialogTrigger asChild>
                    <Card className={`p-4 relative flex justify-between gap-5 group ${id.isDone && 'border-green-400'}`}>
                        <div>{id.name}</div>
                        <div className='flex justify-center items-center gap-4'>
                            {/* {
                                !id.isDone &&
                                <button className="hidden group-hover:block" onClick={handleDoneClick}>
                                    <Image width={15} height={15} src={'/iconDone.png'} alt={'done'} />
                                </button>
                            } */}
                            <button className="hidden group-hover:block" onClick={handleDeleteClick}>
                                <svg className='text-red-500' xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                            <button {...attributes} {...listeners} className={` ${isCursorGrabbing ? 'cursor-grabbing' : 'cursor-grab'}`} aria-describedby={`DndContext-${uniqueId}`}>
                                <svg viewBox="0 0 20 20" width="15">
                                    <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"
                                        fill="currentColor"></path>
                                </svg>
                            </button>
                        </div>
                    </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader className="text-start">
                        <DialogTitle>Edit task</DialogTitle>
                        <DialogDescription>
                            {id.name}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 pt-2">
                        <Input id="name" value={taskData.name} onChange={(e) => setTaskData({ ...taskData, name: e.target.value })} />
                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms" checked={taskData.isDone} onClick={() => setTaskData({ ...taskData, isDone: !taskData.isDone })} />
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Task is done
                            </label>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose className='w-full' >
                            <Button onClick={handleEditClick} className="w-full">Edit</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SortableLinks;
