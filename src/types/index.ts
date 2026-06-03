export type AttendanceStatus = "Present" | "Late" | "Absent";

export type Admin = {
  id: string;
  name: string;
  email: string;
  department: string;
  role: "admin";
  passwordHash: string;
  createdAt: string;
};

export type Employee = {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  department: string;
  role: "employee";
  passwordHash: string;
  createdAt: string;
};

export type AttendanceRecord = {
  id: string;
  employeeId: string;
  status: AttendanceStatus;
  timestamp: string;
  synced: boolean;
};

export type Settings = {
  officeStartTime: string;
  lateThresholdMinutes: number;
  autoAbsentCutoff: string;
  autoCheckoutTime: string;
};

export type Database = {
  admins: Admin[];
  users: Employee[];
  attendance: AttendanceRecord[];
  settings: Settings;
};
