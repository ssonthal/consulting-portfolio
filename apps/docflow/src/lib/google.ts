import { google } from "googleapis";
import { decryptIfPresent } from "./crypto";

export const GOOGLE_SCOPES = [
  "openid",
  "email",
  "profile",
  "https://www.googleapis.com/auth/drive.readonly",
  "https://www.googleapis.com/auth/spreadsheets",
];

export function getOAuth2Client() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  );
}

export async function getAuthenticatedClient(
  encryptedRefreshToken: string,
  encryptedAccessToken?: string | null,
) {
  const oauth2 = getOAuth2Client();
  const refreshToken = decryptIfPresent(encryptedRefreshToken);
  if (!refreshToken) {
    throw new Error("Missing refresh token — sign in again with Google.");
  }
  oauth2.setCredentials({
    refresh_token: refreshToken,
    access_token: decryptIfPresent(encryptedAccessToken ?? null) ?? undefined,
  });
  return oauth2;
}

export async function listDriveFolders(
  auth: InstanceType<typeof google.auth.OAuth2>,
) {
  const drive = google.drive({ version: "v3", auth });
  const res = await drive.files.list({
    q: "mimeType='application/vnd.google-apps.folder' and trashed=false",
    fields: "files(id, name, parents)",
    pageSize: 100,
    orderBy: "modifiedTime desc",
  });
  return res.data.files ?? [];
}

export async function listSpreadsheets(
  auth: InstanceType<typeof google.auth.OAuth2>,
) {
  const drive = google.drive({ version: "v3", auth });
  const res = await drive.files.list({
    q: "mimeType='application/vnd.google-apps.spreadsheet' and trashed=false",
    fields: "files(id, name)",
    pageSize: 100,
    orderBy: "modifiedTime desc",
  });
  return res.data.files ?? [];
}

export async function listPdfsInFolder(
  auth: InstanceType<typeof google.auth.OAuth2>,
  folderId: string,
) {
  const drive = google.drive({ version: "v3", auth });
  const res = await drive.files.list({
    q: `'${folderId}' in parents and mimeType='application/pdf' and trashed=false`,
    fields: "files(id, name, modifiedTime)",
    pageSize: 50,
    orderBy: "modifiedTime desc",
  });
  return res.data.files ?? [];
}

export async function downloadPdf(
  auth: InstanceType<typeof google.auth.OAuth2>,
  fileId: string,
): Promise<Buffer> {
  const drive = google.drive({ version: "v3", auth });
  const res = await drive.files.get(
    { fileId, alt: "media" },
    { responseType: "arraybuffer" },
  );
  return Buffer.from(res.data as ArrayBuffer);
}

export async function getSheetHeaders(
  auth: InstanceType<typeof google.auth.OAuth2>,
  spreadsheetId: string,
  sheetName: string,
): Promise<string[]> {
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `'${sheetName.replace(/'/g, "''")}'!1:1`,
  });
  const row = res.data.values?.[0] ?? [];
  return row.map((cell) => String(cell ?? "").trim()).filter(Boolean);
}

export async function listSheetTabs(
  auth: InstanceType<typeof google.auth.OAuth2>,
  spreadsheetId: string,
) {
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "sheets.properties.title",
  });
  return (
    res.data.sheets?.map((s) => s.properties?.title).filter(Boolean) as string[]
  ) ?? [];
}

export async function appendRow(
  auth: InstanceType<typeof google.auth.OAuth2>,
  spreadsheetId: string,
  sheetName: string,
  values: (string | number | null)[],
) {
  const sheets = google.sheets({ version: "v4", auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `'${sheetName.replace(/'/g, "''")}'!A:Z`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [values.map((v) => (v === null ? "" : v))],
    },
  });
}

export function sheetUrl(spreadsheetId: string, sheetName?: string) {
  const base = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
  return sheetName ? `${base}#gid=0` : base;
}
