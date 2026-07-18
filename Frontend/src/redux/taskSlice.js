import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../services/api";

export const getTasks = createAsyncThunk("tasks/getTasks", async () => {
  const response = await API.get("/items");
  return response.data;
});

export const addTask = createAsyncThunk("tasks/addTask", async (task) => {
  const response = await API.post("/item", task);

  return response.data;
});

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, title }) => {
    await API.put(`/item/${id}`, {
      
      title,
    });

    const response = await API.get("/items");
    return response.data;
  },
);

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  await API.delete(`/item/${id}`);

  const response = await API.get("/items");
  return response.data;
});

export const completeTask = createAsyncThunk(
  "tasks/completeTask",
  async (id) => {
    await API.put(`/item/${id}/complete`);

    return id;
  },
);

export const getCompletedTasks = createAsyncThunk(
  "tasks/getCompletedTasks",
  async () => {
    const response = await API.get("/completed-items");
    return response.data;
  },
);

const taskSlice = createSlice({
  name: "tasks",

  initialState: {
    tasks: [],
    completedTasks: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getTasks.pending, (state) => {
        state.loading = true;
      })

      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })

      .addCase(getTasks.rejected, (state) => {
        state.loading = false;
      })

      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })

      .addCase(getCompletedTasks.fulfilled, (state, action) => {
        state.completedTasks = action.payload;
      })

      .addCase(completeTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
