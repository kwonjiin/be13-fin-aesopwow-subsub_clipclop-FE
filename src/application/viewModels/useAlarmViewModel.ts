// 이게 진짜임

// import { useEffect, useState } from "react";
// import {
//   fetchAlarms,
//   sendAlarm,
//   markAlarmAsRead,
//   AlarmItem,
// } from "@/infrastructure/api/Alarm";

// export const useAlarmViewModel = (userNo: number) => {
//   const [alarms, setAlarms] = useState<AlarmItem[]>([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ 알림 전체 불러오기 (userNo는 필요 없음)
//   const loadAlarms = async () => {
//     try {
//       const data = await fetchAlarms(); // ✅ 여기는 그대로 userNo 없이 호출
//       setAlarms(data);
//     } catch (e) {
//       console.error("❌ 알림 불러오기 실패", e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ 알림 전송 (userNo 사용)
//   const send = async (content: string) => {
//     await sendAlarm(userNo, content); // ✅ userNo 유지
//     await loadAlarms();
//   };

//   // ✅ 알림 읽음 처리
//   const markAsRead = async (alarmId: string) => {
//     try {
//       await markAlarmAsRead(alarmId);
//       await loadAlarms();
//     } catch (e) {
//       console.error("❌ 알림 읽음 처리 실패", e);
//     }
//   };

//   useEffect(() => {
//     loadAlarms(); // ✅ 여전히 userNo는 load에는 필요 없음
//   }, [userNo]);

//   return {
//     alarms,
//     loading,
//     send,
//     markAsRead,
//   };
// };

//테스트좀 할게요

import { useEffect, useState } from "react";
import {
  fetchAlarms,
  sendAlarm,
  markAlarmAsRead,
  AlarmItem,
} from "@/infrastructure/api/Alarm";
// import { getUser } from "@/application/stores/UserStore"; // ✅ userNo 가져오기

export const useAlarmViewModel = () => {
  // const { userNo } = getUser(); // ✅ 스토어에서 직접 userNo 조회
  const userNo = 1; // 테스트용 하드 코딩
  const [alarms, setAlarms] = useState<AlarmItem[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ 알림 전체 불러오기
  const loadAlarms = async () => {
    try {
      const data = await fetchAlarms();
      setAlarms(data);
    } catch (e) {
      console.error("❌ 알림 불러오기 실패", e);
    } finally {
      setLoading(false);
    }
  };

  // ✅ 알림 전송
  const send = async (content: string) => {
    try {
      await sendAlarm(userNo, content);
      await loadAlarms();
    } catch (e) {
      console.error("❌ 알림 전송 실패", e);
    }
  };

  // ✅ 알림 읽음 처리
  const markAsRead = async (alarmId: string | number) => {
    try {
      await markAlarmAsRead(alarmId);
      await loadAlarms();
    } catch (e) {
      console.error("❌ 알림 읽음 처리 실패", e);
    }
  };

  useEffect(() => {
    loadAlarms();
  }, [userNo]); // ✅ userNo 변경 시도 안전하게 감지

  return {
    alarms,
    loading,
    send,
    markAsRead,
  };
};