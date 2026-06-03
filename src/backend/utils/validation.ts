type Issue = { message: string };
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: { issues: Issue[] } };

const fail = <T>(message: string): Result<T> => ({
  success: false,
  error: { issues: [{ message }] },
});
const isEmail = (value: unknown) =>
  typeof value === "string" && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
const isTime = (value: unknown) =>
  typeof value === "string" && /^\d{2}:\d{2}$/.test(value);

export const loginSchema = {
  safeParse(input: any): Result<{ email: string; password: string }> {
    if (!isEmail(input.email)) return fail("Valid email is required");
    if (!input.password) return fail("Password is required");
    return {
      success: true,
      data: { email: input.email, password: String(input.password) },
    };
  },
};
export const employeeCreateSchema = {
  safeParse(
    input: any,
  ): Result<{
    name: string;
    email: string;
    department: string;
    sendEmail?: boolean;
  }> {
    if (!input.name || String(input.name).length < 2)
      return fail("Name is required");
    if (!isEmail(input.email)) return fail("Valid email is required");
    if (!input.department || String(input.department).length < 2)
      return fail("Department is required");
    return {
      success: true,
      data: {
        name: String(input.name),
        email: String(input.email),
        department: String(input.department),
        sendEmail: Boolean(input.sendEmail),
      },
    };
  },
};
export const employeeUpdateSchema = {
  safeParse(
    input: any,
  ): Result<{ name: string; email: string; department: string }> {
    return employeeCreateSchema.safeParse(input) as Result<{
      name: string;
      email: string;
      department: string;
    }>;
  },
};
export const attendanceSchema = {
  safeParse(
    input: any,
  ): Result<{
    employeeId: string;
    status: "Present" | "Late" | "Absent";
    timestamp?: string;
    synced?: boolean;
  }> {
    if (!input.employeeId) return fail("Employee is required");
    if (!["Present", "Late", "Absent"].includes(input.status))
      return fail("Status is required");
    return {
      success: true,
      data: {
        employeeId: String(input.employeeId),
        status: input.status,
        timestamp: input.timestamp,
        synced: input.synced === undefined ? true : Boolean(input.synced),
      },
    };
  },
};
export const settingsSchema = {
  safeParse(
    input: any,
  ): Result<{
    officeStartTime: string;
    lateThresholdMinutes: number;
    autoAbsentCutoff: string;
    autoCheckoutTime: string;
  }> {
    if (
      !isTime(input.officeStartTime) ||
      !isTime(input.autoAbsentCutoff) ||
      !isTime(input.autoCheckoutTime)
    )
      return fail("Times must be HH:mm");
    const lateThresholdMinutes = Number(input.lateThresholdMinutes);
    if (!Number.isFinite(lateThresholdMinutes))
      return fail("Late threshold must be a number");
    return {
      success: true,
      data: {
        officeStartTime: input.officeStartTime,
        lateThresholdMinutes,
        autoAbsentCutoff: input.autoAbsentCutoff,
        autoCheckoutTime: input.autoCheckoutTime,
      },
    };
  },
};
