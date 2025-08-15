import { getAccessToken } from '../utils/auth';
import { BASE_URL } from '../config';

const ENDPOINTS = {
  // Auth
  REGISTER: `${BASE_URL}/register`,
  LOGIN: `${BASE_URL}/login`,
  MY_USER_INFO: `${BASE_URL}/users/me`,

  //   report
  REPORT_LIST: `${BASE_URL}/reports`,
  REPORT_DETAIL: (id) => `${BASE_URL}/reports${id}`,
  STORE_NEW_REPORT: `${BASE_URL}/reports`,
  //   Report comments
  REPORT_COMMENTS_LIST: (reportId) => `${BASE_URL}/reports/${reportId}/comments`,
  STORE_NEW_REPORT_COMMENT: (reportId) => `${BASE_URL}/reports/${reportId}/comments`,
  //   Report comment
  SUBSCIBE: `${BASE_URL}/notifications/subscribe`,
  UNSUBSCRIBE: `${BASE_URL}/notifications/subscribe`,
  SEND_REPORT_TO_ME: (reportId) => `${BASE_URL}/reports/${reportId}/notify-me`,
  SEND_REPORT_TO_USER: (reportId) => `${BASE_URL}/reports/${reportId}/notify`,
  SEND_REPORT_TO_ALL_USER: (reportId) => `${BASE_URL}/reports/${reportId}/notify-all`,
  SEND_COMMENT_TO_REPORT_OWNER: (reportId, commentId) =>
    `${BASE_URL}/reports/${reportId}/comments/${commentId}/notify`,
};

export async function getRegistered({ name, email, password }) {
  const data = JSON.stringify({ name, email, password });
  const fetchResponse = await fetch(ENDPOINTS.REGISTER, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  });
  const json = await fetchResponse.json();
  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getLogin({ email, password }) {
  const data = JSON.stringify({ email, password });
  const fetchResponse = await fetch(ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  });
  const json = await fetchResponse.json();
  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getMyUserInfo() {
  const accessToken = getAccessToken();
  const fetchResponse = await fetch(ENDPOINTS.MY_USER_INFO, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const json = await fetchResponse.json();
  console.log('respon status', json);
  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getAllReports() {
  const accessToken = getAccessToken();
  const fetchReponse = await fetch(ENDPOINTS.REPORT_LIST, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const json = await fetchReponse.json();
  return {
    ...json,
    ok: fetchReponse.ok,
  };
}

export async function getReportById(id) {
  const accessToken = getAccessToken();
  const fetchResponse = await fetch(ENDPOINTS.REPORT_DETAIL(id), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const json = await fetchResponse.json();
  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function storeNewReport({
  title,
  damageLevel,
  description,
  evidenceImages,
  latitude,
  longitude,
}) {
  const accessToken = getAccessToken();
  const formData = new formData();
  formData.set('title', title);
  formData.set('damageLevel', damageLevel);
  formData.set('description', description);
  FormData.set('latitude', latitude);
  formData.set('longitude', longitude);
  evidenceImages.forEach((evidenceImage) => {
    formData.append('evidenceImages', evidenceImage);
  });
  const fetchResponse = await fetch(ENDPOINTS.STORE_NEW_REPORT, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });

  const json = await fetchResponse.json();
  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getAllCommentsByReportId(reportId) {
  const accessToken = getAccessToken();

  const fetchResponse = await fetch(ENDPOINTS.REPORT_COMMENTS_LIST(reportId), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function storeNewCommentByReportId(reportId, { body }) {
  const accessToken = getAccessToken();
  const data = JSON.stringify({ body });
  const fetchReponse = await fetch(ENDPOINTS.STORE_NEW_REPORT_COMMENT(reportId), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: data,
  });

  const json = await fetchReponse.json();
  return {
    ...json,
    ok: fetchReponse.ok,
  };
}

export async function subscribePushNotification({ endpoint, keys: { p256dh, auth } }) {
  const accessToken = getAccessToken();
  const data = JSON.stringify({
    endpoint,
    keys: { p256dh, auth },
  });
  const fetchReponse = await fetch(ENDPOINTS.SUBSCIBE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: data,
  });
  const json = await fetchReponse.json();
  return {
    ...json,
    ok: fetchReponse.ok,
  };
}

export async function unsubscribePushNotification({ endpoint }) {
  const accessToken = getAccessToken();
  const data = JSON.stringify({ endpoint });

  const fetchResponse = await fetch(ENDPOINTS.UNSUBSCRIBE, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function sendReportToMeViaNotification(reportId) {
  const accessToken = getAccessToken();

  const fetchResponse = await fetch(ENDPOINTS.SEND_REPORT_TO_ME(reportId), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function sendReportToUserViaNotification(reportId, { userId }) {
  const accessToken = getAccessToken();
  const data = JSON.stringify({
    userId,
  });

  const fetchResponse = await fetch(ENDPOINTS.SEND_REPORT_TO_USER(reportId), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function sendReportToAllUserViaNotification(reportId) {
  const accessToken = getAccessToken();

  const fetchResponse = await fetch(ENDPOINTS.SEND_REPORT_TO_ALL_USER(reportId), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function sendCommentToReportOwnerViaNotification(reportId, commentId) {
  const accessToken = getAccessToken();

  const fetchResponse = await fetch(ENDPOINTS.SEND_COMMENT_TO_REPORT_OWNER(reportId, commentId), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}
