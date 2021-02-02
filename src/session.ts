import {
  Application,
  CookiesSetDeleteOptions,
  Session,
  SessionData,
} from "../deps.ts";

interface AuthenticatedSession {
  user: string;
  sessionId: string;
}

let authenticatedSessions: AuthenticatedSession[] = [];
let session: Session;

export const registerSessionMiddleWare = async (
  app: Application,
  maxSessionAge: number = 10 * 60,
) => {
  session = new Session();
  await session.init();

  app.use(
    session.use()(session, <CookiesSetDeleteOptions> { maxAge: maxSessionAge }),
  );
};

export const deleteSession = (data: SessionData) => {
  authenticatedSessions = authenticatedSessions.filter((authSession) =>
    authSession.sessionId != data.sessionId
  );
};

export const createAuthenticatedSession = (
  userName: string,
  data: SessionData,
) => {
  authenticatedSessions.push({ user: userName, sessionId: data.sessionId });
};

// deno-lint-ignore-file no-explicit-any no-empty require-await
export const isSessionAuthenticated = (data: SessionData) => {
  return authenticatedSessions.some((authSess) =>
    authSess.sessionId == data.sessionId
  );
};
