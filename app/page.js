"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const operatorAvatar = "/operator.png";

const scenarios = {
  VIP: {
    ACTIVE: {
      title: "VIP • Active",
      goal: "Максимизировать выручку и удерживать постоянное внимание мембера без потери ощущения персонального контакта.",
      actions: [
        "Держать контакт без длинных пауз и не давать диалогу остыть.",
        "Усиливать ощущение персонального внимания и значимости мембера в общении.",
        "Подводить к следующему действию через эмоцию, интерес и вовлечённость, а не через сухую продажу.",
        "Фиксировать каждую оплату или активность как значимое событие, чтобы усиливать его вклад."
      ],
      profile: [
        "Использовать любимое обращение мембера как привычную точку контакта.",
        "Опирайся на его предпочтения, кинки и безопасные для работы сценарии.",
        "Учитывай, где он активен сильнее: если легче вовлекается в Telegram — веди глубже там; если сильнее включается на стриме — поддерживай динамику через стрим.",
        "Повторяй его паттерны покупок: если чаще выбирает приваты, веди к приватам; если любит контент или публичные чаевые, усиливай именно этот формат.",
        "Используй его хобби, интересы и привычные темы как способ удерживать живое вовлечение."
      ],
      focus: ["Эксклюзивность", "Персональная значимость", "Глубокая персонализация"]
    },
    COOLING: {
      title: "VIP • Cooling",
      goal: "Вернуть мембера в активное состояние и восстановить эмоциональный контакт до перехода к монетизации.",
      actions: [
        "Убрать прямую продажу или давление на оплату на первом этапе возврата.",
        "Сфокусироваться на эмоции, внимании и ощущении личного контакта.",
        "Аккуратно опереться на прошлый опыт взаимодействия, чтобы напомнить мемберу о ценности контакта.",
        "Создать ощущение, что его отсутствие замечено, но без упрёка и давления.",
        "После первой позитивной реакции быстро переводить контакт обратно в тёплую фазу общения."
      ],
      profile: [
        "Опирайся на мотивацию мембера: внимание, общение, контроль или потребность в эксклюзивности.",
        "Используй сильные триггеры из профиля точечно: ревность, забота, внимание, синдром защитника, ощущение «только для тебя».",
        "Учитывай, что именно его заводит: предпочтения и фантазии здесь работают как мост обратно в вовлечение.",
        "Смотри на риски и границы: не заходи в темы, которые раздражают, вызывают токсичность или уже не срабатывали.",
        "Если мембер раньше лучше реагировал в одном канале, возвращай его именно через этот канал."
      ],
      focus: ["Внимание", "Личное отношение", "Ощущение значимости"]
    },
    SLEEPING: {
      title: "VIP • Sleeping",
      goal: "Получить любой ответ и заново открыть канал общения без лишнего давления.",
      actions: [
        "Сделать один точный заход на реактивацию без серии повторов.",
        "Использовать самый сильный эмоциональный крючок, но не перегружать контакт.",
        "Не спамить и не пытаться догонять мембера несколькими касаниями подряд.",
        "Если реакции нет, перенести реактивацию на следующее окно, а не сжигать ценного мембера частыми сообщениями."
      ],
      profile: [
        "Используй самый сильный триггер из профиля, который уже работал раньше.",
        "Опирайся на прошлый интерес: что он покупал, где был активен, на что эмоционально откликался.",
        "Не задевать чувствительные темы, риски и раздражители — на этой стадии это особенно опасно.",
        "Лучше опереться на персональную значимость и эксклюзивность, чем на прямой оффер."
      ],
      focus: ["Эксклюзив", "Недосказанность", "Персональная значимость"]
    }
  },
  MEDIUM: {
    ACTIVE: {
      title: "MEDIUM • Active",
      goal: "Поднять ценность мембера и постепенно перевести его в VIP-сегмент.",
      actions: [
        "Сначала давать эмоцию и вовлечение, а уже затем усиливать монетизацию.",
        "Тестировать разные форматы взаимодействия и смотреть, что вызывает лучший отклик.",
        "Проверять реакцию на увеличение глубины контакта и на более ценные форматы покупки.",
        "Сохранять баланс: не перегревать мембера, но и не вести его слишком слабо."
      ],
      profile: [
        "Определи, что именно он покупает чаще всего: публичные чаевые, приваты или контент.",
        "Используй интересы и хобби как способ делать контакт живым и отличать его от шаблонного общения.",
        "Проверяй, какие триггеры работают лучше именно на нём: внимание, забота, ревность, эксклюзивность.",
        "Смотри, какой канал ему привычнее: стрим или Telegram."
      ],
      focus: ["Интерес", "Вовлечение", "Потенциал роста"]
    },
    COOLING: {
      title: "MEDIUM • Cooling",
      goal: "Вернуть мембера в диалог и быстро понять, есть ли у него потенциал снова разогреться.",
      actions: [
        "Делать лёгкий вход без сильного давления и без долгого прогрева.",
        "Проверять реакцию через интерес, лёгкую эмоцию или знакомую тему.",
        "Если мембер отвечает, быстро переводить его в активное взаимодействие.",
        "Если реакции слабые, не тратить на него ресурс VIP-уровня."
      ],
      profile: [
        "Опирайся на интересы мембера и его привычные темы как на безопасную точку возврата.",
        "Используй лёгкие триггеры из профиля, не начиная с самых сильных.",
        "Смотри, что раньше вызывало у него отклик: контент, внимание, общение или игра.",
        "Не уходи в длинные сценарии, если мембер не показывает живой обратной связи."
      ],
      focus: ["Любопытство", "Лёгкое вовлечение"]
    },
    SLEEPING: {
      title: "MEDIUM • Sleeping",
      goal: "Проверить, жив ли контакт, и решить, стоит ли возвращать мембера в работу.",
      actions: [
        "Сделать один короткий сигнал на реакцию.",
        "Оценить отклик максимально быстро и без лишних вложений времени.",
        "Если ответа нет, не продолжать ручную работу по этому мемберу."
      ],
      profile: [
        "Использовать минимальную персонализацию, достаточную только для проверки живости контакта.",
        "Опирайся на самый понятный и безопасный интерес из профиля.",
        "Не использовать тяжёлые эмоциональные триггеры без признаков вовлечённости."
      ],
      focus: ["Минимальный контакт", "Быстрая оценка потенциала"]
    }
  },
  LOW: {
    ACTIVE: {
      title: "LOW • Active",
      goal: "Получить быструю монетизацию с минимальными затратами времени оператора.",
      actions: [
        "Использовать простые и понятные механики без сложного прогрева.",
        "Не инвестировать в мембера больше времени, чем он реально оправдывает.",
        "Быстро проверять готовность к действию и закрывать контакт, если отдача слабая."
      ],
      profile: [
        "Опирайся только на самые очевидные данные профиля: что покупает и где активен.",
        "Не использовать глубокую персонализацию, если сегмент этого не окупает.",
        "Если мембер любит только один конкретный формат покупки, веди прямо в него без лишних обходов."
      ],
      focus: ["Прямое действие", "Скорость", "Экономия ресурса"]
    },
    COOLING: {
      title: "LOW • Cooling",
      goal: "Быстро оценить, есть ли смысл продолжать контакт, или лучше сохранить ресурс.",
      actions: [
        "Сделать короткий пинг без дополнительных вложений.",
        "При слабой или нулевой реакции не продолжать работу вручную.",
        "Не переносить на этот сегмент внимание, нужное более ценным мемберам."
      ],
      profile: [
        "Используй профиль минимально, только как подсказку по каналу и типу покупки.",
        "Не задействуй сложные триггеры и глубокий прогрев на этом сегменте."
      ],
      focus: ["Минимум усилий", "Оценка потенциала"]
    },
    SLEEPING: {
      title: "LOW • Sleeping",
      goal: "Сохранить ресурс оператора и не тратить ручное внимание на низкоприоритетный сегмент без сигнала к возврату.",
      actions: [
        "Не тратить ручной ресурс без явной причины возвращаться к контакту.",
        "Оставить этот сегмент на позднюю проверку или автоматические касания, если они есть.",
        "Сосредоточить внимание на более ценных и перспективных мемберах."
      ],
      profile: [
        "Профиль использовать только как справочную информацию, без глубокой ручной работы.",
        "Не заходить в сложную персонализацию и не тратить время на сценарии удержания."
      ],
      focus: ["Игнор", "Сохранение ресурса"]
    }
  }
};

const valueStyles = {
  VIP: "border-violet-200 bg-violet-50 text-violet-700 shadow-[0_12px_40px_rgba(124,58,237,0.14)]",
  MEDIUM: "border-sky-200 bg-sky-50 text-sky-700 shadow-[0_12px_40px_rgba(14,165,233,0.14)]",
  LOW: "border-rose-200 bg-rose-50 text-rose-700 shadow-[0_16px_48px_rgba(244,63,94,0.22)]"
};

const statusStyles = {
  ACTIVE: "border-emerald-200 bg-emerald-50 text-emerald-700 shadow-[0_12px_40px_rgba(16,185,129,0.14)]",
  COOLING: "border-blue-200 bg-blue-50 text-blue-700 shadow-[0_12px_40px_rgba(59,130,246,0.14)]",
  SLEEPING: "border-rose-200 bg-rose-50 text-rose-700 shadow-[0_16px_48px_rgba(244,63,94,0.22)]"
};

const resultGlow = {
  ACTIVE: "shadow-[0_20px_70px_rgba(16,185,129,0.10)]",
  COOLING: "shadow-[0_20px_70px_rgba(59,130,246,0.10)]",
  SLEEPING: "shadow-[0_22px_80px_rgba(244,63,94,0.14)]"
};

function AvatarPair() {
  return (
    <div className="mb-4 flex items-center justify-center gap-3">
      
      {/* LEFT — easy operator */}
      <div className="relative h-[72px] w-[72px] rounded-full bg-white p-1 shadow-[0_14px_40px_rgba(15,23,42,0.10)] ring-1 ring-white/80">
        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[radial-gradient(circle_at_top,#f4fffd_0%,#dff8f4_45%,#d0efe9_100%)]">
          <img
            src={operatorAvatar}
            alt="easy operator"
            className="h-[86%] w-[86%] object-contain"
          />
        </div>
      </div>

      {/* CENTER — connection */}
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-300 shadow-[0_10px_30px_rgba(15,23,42,0.08)] ring-1 ring-white/80">
        ↔
      </div>

      {/* RIGHT — member */}
      <div className="relative h-[72px] w-[72px] rounded-full bg-white p-1 shadow-[0_14px_40px_rgba(15,23,42,0.10)] ring-1 ring-white/80">
        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[radial-gradient(circle_at_top,#fff8ef_0%,#f4e4cf_52%,#ead5ba_100%)]">
          <img
            src="/member.png"
            alt="member"
            className="h-[86%] w-[86%] object-contain"
          />
        </div>
      </div>

    </div>
  );
}

export default function MiniApp() {
  const [step, setStep] = useState(1);
  const [value, setValue] = useState("VIP");
  const [status, setStatus] = useState("COOLING");

  const scenario = scenarios[value][status];
  const badgeStatusLabel = useMemo(() => {
    if (status === "ACTIVE") return "Active";
    if (status === "COOLING") return "Cooling";
    return "Sleeping";
  }, [status]);

  const resultClass =
    status === "SLEEPING" || value === "LOW"
      ? "shadow-[0_22px_80px_rgba(244,63,94,0.14)]"
      : resultGlow[status];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ffffff,transparent_35%),linear-gradient(135deg,#f8fafc_0%,#eef2ff_45%,#f8fafc_100%)] px-4 py-6 text-slate-900">
      <div className="mx-auto w-full max-w-sm space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl"
        >
          <AvatarPair />
          <div className="mb-2 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
            Retention playbook
          </div>
          <h1 className="text-center text-2xl font-semibold tracking-tight text-slate-900">
            План действий
          </h1>
          <p className="mt-2 text-center text-sm leading-6 text-slate-500">
            Выбери ценность мембера и его текущий статус, чтобы получить инструкцию.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28 }}
              className="space-y-3"
            >
              <div className="px-1 text-sm font-medium text-slate-500">Ценность мембера</div>
              {[
                { key: "VIP", label: "VIP", hint: "Максимальный приоритет" },
                { key: "MEDIUM", label: "MEDIUM", hint: "Потенциал роста" },
                { key: "LOW", label: "LOW", hint: "Минимум ресурса" }
              ].map((item) => (
                <motion.button
                  whileTap={{ scale: 0.985 }}
                  key={item.key}
                  onClick={() => setValue(item.key)}
                  className={`w-full rounded-[24px] border p-4 text-left transition-all duration-200 ${
                    value === item.key
                      ? valueStyles[item.key]
                      : "border-white/70 bg-white/70 text-slate-800 shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
                  }`}
                >
                  <div className="text-base font-semibold">{item.label}</div>
                  <div className="mt-1 text-sm opacity-80">{item.hint}</div>
                </motion.button>
              ))}
              <button
                onClick={() => setStep(2)}
                className="w-full rounded-[24px] bg-slate-950 px-4 py-4 text-sm font-medium text-white shadow-[0_16px_40px_rgba(15,23,42,0.18)] transition hover:translate-y-[-1px]"
              >
                Далее
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28 }}
              className="space-y-3"
            >
              <div className="px-1 text-sm font-medium text-slate-500">Текущий статус</div>
              {[
                { key: "ACTIVE", label: "Active", hint: "Вовлечён и отвечает" },
                { key: "COOLING", label: "Cooling", hint: "Остывает, нужно вернуть" },
                { key: "SLEEPING", label: "Sleeping", hint: "Почти потерян, нужна реактивация" }
              ].map((item) => (
                <motion.button
                  whileTap={{ scale: 0.985 }}
                  key={item.key}
                  onClick={() => setStatus(item.key)}
                  className={`w-full rounded-[24px] border p-4 text-left transition-all duration-200 ${
                    status === item.key
                      ? statusStyles[item.key]
                      : "border-white/70 bg-white/70 text-slate-800 shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
                  }`}
                >
                  <div className="text-base font-semibold">{item.label}</div>
                  <div className="mt-1 text-sm opacity-80">{item.hint}</div>
                </motion.button>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="rounded-[24px] border border-white/70 bg-white/70 px-4 py-4 text-sm font-medium text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
                >
                  Назад
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="rounded-[24px] bg-slate-950 px-4 py-4 text-sm font-medium text-white shadow-[0_16px_40px_rgba(15,23,42,0.18)]"
                >
                  Показать
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.985 }}
              transition={{ duration: 0.34, ease: "easeOut" }}
              className="space-y-4"
            >
              <div className={`rounded-[28px] border border-white/70 bg-white/85 p-5 backdrop-blur-xl ${resultClass}`}>
                <div className="mb-4 flex flex-wrap gap-2">
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${valueStyles[value]}`}>
                    {value}
                  </span>
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}>
                    {badgeStatusLabel}
                  </span>
                </div>

                <h2 className="text-xl font-semibold tracking-tight text-slate-900">{scenario.title}</h2>

                <div className="mt-5 space-y-4">
                  <div className="rounded-[22px] bg-slate-50 p-4">
                    <div className="mb-2 text-sm font-semibold text-slate-900">Цель</div>
                    <p className="text-sm leading-6 text-slate-600">{scenario.goal}</p>
                  </div>

                  <div className="rounded-[22px] bg-slate-50 p-4">
                    <div className="mb-2 text-sm font-semibold text-slate-900">Действия</div>
                    <ul className="space-y-2 text-sm leading-6 text-slate-600">
                      {scenario.actions.map((item, index) => (
                        <li key={index} className="flex gap-2">
                          <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-slate-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-[22px] bg-blue-50 p-4">
                    <div className="mb-2 text-sm font-semibold text-slate-900">Как использовать профиль</div>
                    <ul className="space-y-2 text-sm leading-6 text-slate-700">
                      {scenario.profile.map((item, index) => (
                        <li key={index} className="flex gap-2">
                          <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-blue-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-[22px] bg-violet-50 p-4">
                    <div className="mb-2 text-sm font-semibold text-slate-900">Фокус взаимодействия</div>
                    <div className="flex flex-wrap gap-2">
                      {scenario.focus.map((item, index) => (
                        <span
                          key={index}
                          className="rounded-full border border-violet-200 bg-white px-3 py-1.5 text-xs font-medium text-violet-700"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="rounded-[24px] border border-white/70 bg-white/70 px-4 py-4 text-sm font-medium text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
                >
                  Назад
                </button>
                <button
                  onClick={() => setStep(1)}
                  className="rounded-[24px] bg-slate-950 px-4 py-4 text-sm font-medium text-white shadow-[0_16px_40px_rgba(15,23,42,0.18)]"
                >
                  Сначала
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
