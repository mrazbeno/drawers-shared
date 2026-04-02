import type { StrokeOptions } from "perfect-freehand";

export type StrokePoint = [x: number, y: number, pressure: number];

export type StrokeBounds = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
};

export type StrokeHideEvent = {
  roomId: string;
  userId: string;
  strokeId: string;
};

export type StrokeShowEvent = {
  roomId: string;
  userId: string;
  strokeId: string;
};

export interface BrushSettings {
  strokeOptions: StrokeOptions;
  brushColor: string;
}

export type DrawStartEvent = {
  roomId: string;
  userId: string;
  points: StrokePoint[];
  newBrushSettings?: BrushSettings;
};

export type DrawUpdateEvent = {
  roomId: string;
  userId: string;
  points: StrokePoint[];
};

export type DrawEndEvent = {
  roomId: string;
  userId: string;
  points: StrokePoint[];
};

export type CursorEvent = {
  roomId: string;
  userId: string;
  x: number;
  y: number;
};

export type RoomAction = {
  roomId: string;
  username: string;
};

export interface StrokeHistoryRecord {
  id: string;
  userId?: string;
  brushSettings: BrushSettings;
  svgPath: string;
  bounds: StrokeBounds;
  createdAt: number;
}

export type CanvasStrokeHistory = StrokeHistoryRecord[];

export type RoomUsers = [string, string][];

export interface ServerToClientEvents {
  stroke_hide: (data: StrokeHideEvent) => void;
  stroke_show: (data: StrokeShowEvent) => void;

  general_error: (data: { message: string }) => void;

  draw_start: (data: DrawStartEvent) => void;
  draw_update: (data: DrawUpdateEvent) => void;
  draw_end: (data: DrawEndEvent) => void;

  cursor_move: (data: CursorEvent) => void;

  user_joined: (data: RoomUsers) => void;
  user_left: (data: RoomUsers) => void;

  join_success: (ownUserId: string) => void;
  join_error: (data: { message: string }) => void;

  clear_canvas: () => void;
  host_changed: (newHostId: string) => void;
  return_users: (roomUsers: RoomUsers, hostUserId: string) => void;

  request_canvas_snapshot: (targetUserId: string) => void;
  canvas_snapshot: (data: {
    targetUserId: string;
    snapshot: CanvasStrokeHistory;
  }) => void;

  request_brush_states: (data: { targetUserId: string }) => void;
  brush_state: (data: {
    targetUserId: string;
    userId: string;
    brushSettings: BrushSettings;
  }) => void;
}

export interface ClientToServerEvents {
  stroke_hide: (data: StrokeHideEvent) => void;
  stroke_show: (data: StrokeShowEvent) => void;

  join_room: (data: RoomAction) => void;

  draw_start: (data: DrawStartEvent) => void;
  draw_update: (data: DrawUpdateEvent) => void;
  draw_end: (data: DrawEndEvent) => void;

  cursor_move: (data: CursorEvent) => void;

  clear_canvas: (data: RoomAction) => void;
  fetch_users: (roomId: string) => void;

  canvas_snapshot: (data: {
    targetUserId: string;
    snapshot: CanvasStrokeHistory;
  }) => void;

  request_canvas_snapshot: (data: {
    roomId: string;
    targetUserId: string;
  }) => void;

  request_brush_states: (data: {
    roomId: string;
    targetUserId: string;
  }) => void;

  brush_state: (data: {
    targetUserId: string;
    userId: string;
    brushSettings: BrushSettings;
  }) => void;
}