"use client";
import CharaPanel from "./components/charaPanel";

export default function DragDropWrap({DB}) {
    return(
        <main className="flex flex-col items-center justify-between p-24">
            
                
                    <CharaPanel list={DB} />
                
            
        </main>
    )
}

