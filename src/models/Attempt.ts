export type Attempt = {
  id: number;
  timestamp: string;
  recognized_user: string;
  status: "success" | "failure";
  details: string;
  flagged?: boolean;
};
