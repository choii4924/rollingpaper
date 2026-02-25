import type { Message } from '../../types/Message';
import './MessageList.css';

interface MessageListProps {
    messages: Message[];
    loading?: boolean;
}

const CARD_COLORS = [
    '#fce4ec',
    '#e8f5e9',
    '#fff9c4',
    '#e3f2fd',
    '#f3e5f5',
    '#fff3e0',
    '#e0f2f1',
    '#fce4f3',
];

function MessageList({ messages, loading = false }: MessageListProps) {
    return (
        <section className="message-list" id="message-list">
            <h2 className="message-list__title">
                받은 메시지{' '}
                <span className="message-list__count">({messages.length})</span>
            </h2>
            {loading ? (
                <div className="message-list__empty">
                    <span className="message-list__empty-icon">⏳</span>
                    <p>메시지를 불러오는 중...</p>
                </div>
            ) : messages.length === 0 ? (
                <div className="message-list__empty">
                    <span className="message-list__empty-icon">💌</span>
                    <p>아직 받은 메시지가 없습니다.</p>
                    <p>첫 번째 메시지를 남겨보세요!</p>
                </div>
            ) : (
                <div className="message-list__grid">
                    {messages.map((msg, index) => (
                        <article
                            key={msg.id}
                            className="message-card"
                            style={{
                                backgroundColor: CARD_COLORS[index % CARD_COLORS.length],
                                animationDelay: `${index * 0.08}s`,
                            }}
                        >
                            <div className="message-card__header">
                                <svg
                                    className="message-card__icon"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect
                                        x="3"
                                        y="5"
                                        width="18"
                                        height="14"
                                        rx="3"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    />
                                    <path
                                        d="M3 9L12 14L21 9"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <span className="message-card__author">{msg.author}</span>
                            </div>
                            <p className="message-card__content">{msg.content}</p>
                            <time className="message-card__date">{msg.created_at.slice(0, 10)}</time>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}

export default MessageList;
