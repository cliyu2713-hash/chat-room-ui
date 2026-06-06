import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  ChevronLeft,
  MoreVertical,
  Smile,
  Image as ImageIcon,
  Plus,
  CheckCircle2,
  Send,
  Star,
  X,
} from "lucide-react";

const avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=cskay";
const productUrl = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CRTTR5293超自然行动组" },
      { name: "description", content: "交易聊天室" },
    ],
  }),
  component: ChatRoom,
});

const EMOJIS = [
  "😀","😁","😂","🤣","😅","😊","😍","😘","🤔","😎",
  "😢","😭","😡","🥺","😴","🤗","🙏","👍","👎","👏",
  "💪","🎉","❤️","💔","🔥","✨","⭐","🌹","🎁","💰",
];

const SMART_REPLIES: { keys: string[]; reply: string }[] = [
  { keys: ["价格", "多少钱", "便宜"], reply: "您好，该商品预估到手价 ¥235，已是最低优惠价啦~" },
  { keys: ["发货", "什么时候", "多久"], reply: "亲，订单已支付，预计 3-5 分钟内为您安排发货哦~" },
  { keys: ["退款", "退货"], reply: "您好，请描述退款原因，我们会在 24 小时内审核处理。" },
  { keys: ["你好", "在吗", "hi", "在么"], reply: "您好，我是螃蟹交付专员-凯凯，很高兴为您服务！" },
  { keys: ["谢谢", "感谢", "thanks"], reply: "不客气，祝您游戏愉快~ 有问题随时@我哟~" },
  { keys: ["问题", "怎么办", "故障"], reply: "请详细描述问题，我会马上为您排查处理~" },
];

function smartReply(text: string): string {
  const lower = text.toLowerCase();
  for (const { keys, reply } of SMART_REPLIES) {
    if (keys.some((k) => lower.includes(k))) return reply;
  }
  return "收到您的消息~ 客服正在火速处理，请稍候。";
}

function Avatar() {
  return (
    <img
      src={avatarUrl}
      alt="客服头像"
      className="w-10 h-10 rounded-full object-cover shrink-0"
    />
  );
}

function MsgHeader({ time }: { time: string }) {
  return (
    <div className="flex items-center gap-2 mb-1.5 text-[13px]">
      <span className="text-gray-700">螃蟹交付专员-凯凯</span>
      <span className="bg-orange-400 text-white text-[10px] px-1.5 py-0.5 rounded">官方</span>
      <span className="text-gray-400 text-xs">{time}</span>
    </div>
  );
}

type Msg =
  | { id: number; kind: "system"; text: string }
  | { id: number; kind: "user-text"; text: string; time: string }
  | { id: number; kind: "user-image"; url: string; time: string }
  | { id: number; kind: "bot-text"; text: string; time: string };

function formatTime(d = new Date()) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getMonth() + 1)}/${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

export function ChatRoom() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [modal, setModal] = useState<null | "rate" | "info" | "complaint">(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const idRef = useRef(1);
  const nextId = () => idRef.current++;

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  const botReply = (text: string) => {
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        { id: nextId(), kind: "bot-text", text, time: formatTime() },
      ]);
    }, 1200);
  };

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [
      ...m,
      { id: nextId(), kind: "user-text", text, time: formatTime() },
    ]);
    setInput("");
    setShowEmoji(false);
    botReply(smartReply(text));
  };

  const handleAction = (label: string) => {
    if (label === "催客服") {
      setMessages((m) => [
        ...m,
        { id: nextId(), kind: "system", text: "您已催促客服，正在加急处理中~" },
      ]);
      botReply("收到催促，客服正在第一时间为您处理，请稍候~");
    } else if (label === "评价") setModal("rate");
    else if (label === "交易信息") setModal("info");
    else if (label === "投诉建议") setModal("complaint");
  };

  const pickEmoji = (e: string) => {
    setInput((v) => v + e);
    setShowEmoji(false);
  };

  const onPickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setMessages((m) => [
      ...m,
      { id: nextId(), kind: "user-image", url, time: formatTime() },
    ]);
    botReply("已收到您发来的图片，正在为您查看~");
    e.target.value = "";
  };

  return (
    <div className="h-[100dvh] bg-[#f5f5f5] flex flex-col max-w-[480px] mx-auto overflow-hidden relative">
      {/* Header */}
      <div className="shrink-0 bg-white px-3 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => window.history.back()} aria-label="返回">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <h1 className="text-[17px] font-semibold text-gray-900">CRTTR5293超自然行动组</h1>
        </div>
        <button onClick={() => toast("更多操作")} aria-label="更多">
          <MoreVertical className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Steps */}
      <div className="shrink-0 bg-white px-4 pb-3 flex items-center justify-between text-[13px]">
        {["确认账号信息", "买家上号验号", "双方换绑账号"].map((s) => (
          <div key={s} className="flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-green-500 fill-green-500 text-white" strokeWidth={2.5} />
            <span className="text-gray-700">{s}</span>
          </div>
        ))}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto flex flex-col gap-5 px-3 py-3 pr-4">
        <div className="self-center text-center text-[13px] text-gray-400">
          螃蟹交付专员-凯凯创建了群组
        </div>
        <div className="self-center text-center text-[13px] text-gray-400 px-6 leading-relaxed">
          用户_5871616已催促，正策马加鞭为您处理，预计3-5分钟内回复~
        </div>

        {/* Original 3 fixed bot messages */}
        <div className="self-start flex gap-2 w-full">
          <Avatar />
          <div className="min-w-0 flex-1">
            <MsgHeader time="05/07 13:32" />
            <div className="bg-white rounded-lg rounded-tl-sm p-4 shadow-sm space-y-2 break-words">
              <div className="text-[17px] font-semibold text-gray-900">订单已支付</div>
              <div className="text-[15px] text-gray-700 break-all">
                订单编号：<br />
                ZH21590414336825520954
              </div>
              <div className="text-[15px] text-gray-700">商品编号：CRTTR5293</div>
            </div>
          </div>
        </div>

        <div className="self-start flex gap-2 w-full">
          <Avatar />
          <div className="min-w-0 flex-1">
            <MsgHeader time="05/07 13:32" />
            <div className="relative bg-rose-50 border border-rose-300 rounded-xl rounded-tl-sm p-4 shadow-sm break-words">
              <div className="absolute -top-px right-0 bg-red-300 text-white text-xs px-2.5 py-1 rounded-tr-lg rounded-bl-lg">
                重要步骤
              </div>
              <div className="text-[17px] font-semibold text-gray-900 mb-2">温馨小贴士</div>
              <div className="text-orange-500 text-[15px] mb-1.5">@用户_***616(买家)</div>
              <div className="inline-block bg-orange-400 text-white text-[15px] px-2 py-0.5 rounded mb-3">
                @效率爽快点(卖家)
              </div>
              <div className="text-red-400 text-[14px] leading-relaxed space-y-1">
                <div>1.客服服务时间为：09:30-00:30，非服务时段请勿擅自操作流程</div>
                <div>2.交易中有问题请及时@或催一催客服</div>
              </div>
            </div>
          </div>
        </div>

        <div className="self-start flex gap-2 w-full">
          <Avatar />
          <div className="min-w-0 flex-1">
            <MsgHeader time="05/07 13:32" />
            <div className="relative bg-white rounded-lg rounded-tl-sm p-4 shadow-sm break-words">
              <div className="flex items-center gap-2 mb-3 flex-wrap pr-16">
                <span className="text-[17px] font-semibold text-gray-900">请阅读确认</span>
                <span className="bg-orange-400 text-white text-[15px] px-2 py-0.5 rounded">
                  @效率爽快点(卖家)
                </span>
              </div>
              <div className="absolute top-3 right-3 border-2 border-green-500 text-green-600 text-xs px-2 py-1 rounded font-bold rotate-12 opacity-80">
                已完成
              </div>
              <div className="flex gap-3 pt-2 border-t border-gray-100">
                <img src={productUrl} alt="商品图" className="w-20 h-20 rounded object-cover shrink-0" />
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="text-[15px] text-gray-900 font-medium truncate">【CRTTR5293】金皮3...</div>
                  <div className="text-[13px] text-gray-400">原价 ¥288</div>
                  <div className="text-orange-500 text-[14px]">预估到手 ¥235</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic messages */}
        {messages.map((m) => {
          if (m.kind === "system") {
            return (
              <div key={m.id} className="self-center text-center text-[12px] text-gray-400 bg-gray-200/60 px-3 py-1 rounded-full">
                {m.text}
              </div>
            );
          }
          if (m.kind === "user-text") {
            return (
              <div key={m.id} className="self-end flex flex-col items-end max-w-[80%]">
                <div className="text-[12px] text-gray-400 mb-1">{m.time}</div>
                <div className="bg-orange-400 text-white text-[15px] px-3 py-2 rounded-lg rounded-tr-sm shadow-sm break-words">
                  {m.text}
                </div>
              </div>
            );
          }
          if (m.kind === "user-image") {
            return (
              <div key={m.id} className="self-end flex flex-col items-end max-w-[70%]">
                <div className="text-[12px] text-gray-400 mb-1">{m.time}</div>
                <img src={m.url} alt="发送的图片" className="rounded-lg shadow-sm max-h-60 object-cover" />
              </div>
            );
          }
          return (
            <div key={m.id} className="self-start flex gap-2 w-full">
              <Avatar />
              <div className="min-w-0 flex-1">
                <MsgHeader time={m.time} />
                <div className="bg-white rounded-lg rounded-tl-sm p-3 shadow-sm break-words text-[15px] text-gray-800">
                  {m.text}
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {typing && (
          <div className="self-start flex gap-2">
            <Avatar />
            <div className="bg-white rounded-lg rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
            </div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="shrink-0 bg-white px-3 py-2 flex gap-2 overflow-x-auto border-t border-gray-100">
        {[
          { label: "催客服", color: "text-orange-500", svg: <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" /> },
          { label: "评价", color: "text-pink-500", svg: (
              <>
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="9" y1="9" x2="9.01" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="15" y1="9" x2="15.01" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            ) },
          { label: "交易信息", color: "text-green-500", svg: (
              <>
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2" />
                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" />
              </>
            ) },
          { label: "投诉建议", color: "text-blue-500", svg: (
              <>
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                <line x1="12" y1="8" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            ) },
        ].map(({ label, color, svg }) => (
          <button
            key={label}
            onClick={() => handleAction(label)}
            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full shrink-0 active:bg-gray-50"
          >
            <svg viewBox="0 0 24 24" fill={label === "催客服" ? "currentColor" : "none"} className={`w-4 h-4 ${color}`}>
              {svg}
            </svg>
            <span className="text-[12px] text-gray-700">{label}</span>
          </button>
        ))}
      </div>

      {/* Emoji panel */}
      {showEmoji && (
        <div className="shrink-0 bg-white border-t border-gray-100 px-3 py-3 grid grid-cols-10 gap-1">
          {EMOJIS.map((e) => (
            <button
              key={e}
              onClick={() => pickEmoji(e)}
              className="text-xl h-8 hover:bg-gray-100 rounded"
            >
              {e}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="shrink-0 bg-white px-3 py-2 flex items-center gap-2 border-t border-gray-100 pb-6">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setShowEmoji(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              send();
            }
          }}
          placeholder="请输入想咨询的问题..."
          className="flex-1 bg-gray-100 rounded-lg px-3 py-2.5 text-base text-gray-800 placeholder:text-gray-400 outline-none"
        />
        {input.trim() ? (
          <button
            onClick={send}
            className="h-9 px-3 rounded-lg bg-orange-400 text-white flex items-center justify-center shrink-0 active:bg-orange-500"
          >
            <Send className="w-4 h-4" />
          </button>
        ) : (
          <>
            <button
              onClick={() => setShowEmoji((v) => !v)}
              className={`w-9 h-9 rounded-lg ${showEmoji ? "bg-orange-100" : "bg-gray-100"} flex items-center justify-center shrink-0`}
            >
              <Smile className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => fileRef.current?.click()}
              className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0"
            >
              <ImageIcon className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => toast("更多功能即将开放")}
              className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0"
            >
              <Plus className="w-5 h-5 text-gray-600" />
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onPickImage}
            />
          </>
        )}
      </div>

      {/* Modals */}
      {modal && (
        <div
          className="absolute inset-0 bg-black/40 flex items-end z-50"
          onClick={() => setModal(null)}
        >
          <div
            className="w-full bg-white rounded-t-2xl p-5 max-h-[80%] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {modal === "rate" && (
              <RateForm
                onSubmit={(stars, txt) => {
                  setModal(null);
                  setMessages((m) => [
                    ...m,
                    { id: nextId(), kind: "system", text: `您给本次服务评了 ${stars} 星` },
                  ]);
                  botReply(`感谢您的 ${stars} 星评价${txt ? `：「${txt}」` : ""}，我们会持续提供优质服务~`);
                }}
                onClose={() => setModal(null)}
              />
            )}
            {modal === "info" && <InfoPanel onClose={() => setModal(null)} />}
            {modal === "complaint" && (
              <ComplaintForm
                onSubmit={(cat, txt) => {
                  setModal(null);
                  setMessages((m) => [
                    ...m,
                    { id: nextId(), kind: "system", text: `已提交「${cat}」类投诉` },
                  ]);
                  botReply(`您的「${cat}」投诉已记录${txt ? `，内容：${txt}` : ""}，我们会在 24 小时内跟进处理。`);
                }}
                onClose={() => setModal(null)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ModalHeader({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-[17px] font-semibold text-gray-900">{title}</h3>
      <button onClick={onClose}>
        <X className="w-5 h-5 text-gray-500" />
      </button>
    </div>
  );
}

function RateForm({ onSubmit, onClose }: { onSubmit: (stars: number, txt: string) => void; onClose: () => void }) {
  const [stars, setStars] = useState(5);
  const [txt, setTxt] = useState("");
  return (
    <>
      <ModalHeader title="服务评价" onClose={onClose} />
      <div className="flex justify-center gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} onClick={() => setStars(n)}>
            <Star
              className={`w-8 h-8 ${n <= stars ? "fill-orange-400 text-orange-400" : "text-gray-300"}`}
            />
          </button>
        ))}
      </div>
      <textarea
        value={txt}
        onChange={(e) => setTxt(e.target.value)}
        placeholder="请输入您的评价（选填）"
        className="w-full bg-gray-100 rounded-lg p-3 text-base outline-none resize-none h-24"
      />
      <button
        onClick={() => onSubmit(stars, txt.trim())}
        className="w-full mt-4 py-3 bg-orange-400 text-white rounded-lg text-[15px] font-medium active:bg-orange-500"
      >
        提交评价
      </button>
    </>
  );
}

function InfoPanel({ onClose }: { onClose: () => void }) {
  const rows = [
    ["订单编号", "ZH21590414336825520954"],
    ["商品编号", "CRTTR5293"],
    ["商品名称", "【CRTTR5293】金皮3账号"],
    ["原价", "¥288"],
    ["预估到手", "¥235"],
    ["订单状态", "已支付 · 交付中"],
    ["创建时间", "05/07 13:32"],
    ["卖家", "效率爽快点"],
    ["买家", "用户_***616"],
  ];
  return (
    <>
      <ModalHeader title="交易信息" onClose={onClose} />
      <div className="divide-y divide-gray-100">
        {rows.map(([k, v]) => (
          <div key={k} className="py-2.5 flex justify-between gap-3 text-[14px]">
            <span className="text-gray-500 shrink-0">{k}</span>
            <span className="text-gray-900 text-right break-all">{v}</span>
          </div>
        ))}
      </div>
      <button
        onClick={onClose}
        className="w-full mt-4 py-3 bg-gray-100 text-gray-700 rounded-lg text-[15px] font-medium"
      >
        关闭
      </button>
    </>
  );
}

function ComplaintForm({ onSubmit, onClose }: { onSubmit: (cat: string, txt: string) => void; onClose: () => void }) {
  const cats = ["客服态度", "发货问题", "商品质量", "退款问题", "其他"];
  const [cat, setCat] = useState(cats[0]);
  const [txt, setTxt] = useState("");
  return (
    <>
      <ModalHeader title="投诉建议" onClose={onClose} />
      <div className="flex flex-wrap gap-2 mb-4">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-3 py-1.5 rounded-full text-[13px] border ${
              cat === c
                ? "bg-orange-400 text-white border-orange-400"
                : "bg-white text-gray-700 border-gray-200"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <textarea
        value={txt}
        onChange={(e) => setTxt(e.target.value)}
        placeholder="请详细描述您的问题或建议..."
        className="w-full bg-gray-100 rounded-lg p-3 text-base outline-none resize-none h-28"
      />
      <button
        onClick={() => onSubmit(cat, txt.trim())}
        className="w-full mt-4 py-3 bg-orange-400 text-white rounded-lg text-[15px] font-medium active:bg-orange-500"
      >
        提交
      </button>
    </>
  );
}
