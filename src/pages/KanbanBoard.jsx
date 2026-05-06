import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function KanbanBoard({ tasks, setTasks }) {

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newStatus = result.destination.droppableId;

    const updatedTasks = tasks.map(task =>
      task.id === result.draggableId
        ? { ...task, status: newStatus }
        : task
    );

    setTasks(updatedTasks);
  };

  const columns = {
    todo: tasks.filter(t => t.status === "todo"),
    doing: tasks.filter(t => t.status === "doing"),
    done: tasks.filter(t => t.status === "done")
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", gap: "20px" }}>
        
        {Object.entries(columns).map(([key, items]) => (
          <Droppable droppableId={key} key={key}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  width: "30%",
                  minHeight: "200px",
                  border: "1px solid gray",
                  padding: "10px"
                }}
              >
                <h3>{key}</h3>

                {items.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          padding: "10px",
                          margin: "5px 0",
                          background: "#eee",
                          ...provided.draggableProps.style
                        }}
                      >
                        {task.title}
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}

      </div>
    </DragDropContext>
  );
}

export default KanbanBoard;
