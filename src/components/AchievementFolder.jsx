import { useState } from 'react';
import InteractiveSticker from './InteractiveSticker';

const ACHIEVEMENTS = [
  {
    id: 'pahal',
    title: 'PAHAL NGO',
    subtitle: 'Volunteer & Social Service',
    color: 'var(--mint-mid)',
    description:
      'Actively contributed to community welfare initiatives through PAHAL NGO and received an Appreciation Certificate for dedication and valuable contributions.',
  },
  {
    id: 'gdsc',
    title: 'GDSC DevCreate',
    subtitle: 'Hackathon Participant',
    color: 'var(--sky-mid)',
    description:
      'Participated in the Google Developer Groups (GDSC) DevCreate Hackathon, collaborating in a team to build innovative solutions and enhance problem-solving and development skills.',
  },
  {
    id: 'mybharat',
    title: 'My Bharat',
    subtitle: 'Active Member',
    color: 'var(--blush-mid)',
    description:
      'An active member of the My Bharat platform, regularly participating in quizzes and youth engagement activities to strengthen knowledge and civic awareness.',
  },
];

export default function AchievementFolder() {
  const [dialogData, setDialogData] = useState(null);

  return (
    <>
      <div className="ach-folder" aria-label="Achievement folder">
        {/* Folder back panel */}
        <div className="ach-folder-back" />

        {/* Stickers attached to back folder */}
        <InteractiveSticker message="Turn toward the light. Or the snacks. Both work."  src="/stickers/2flower-removebg-preview.svg" alt="flower" className="ach-flower-1" />
        <InteractiveSticker message="Turn toward the light. Or the snacks. Both work."  src="/stickers/2flower-removebg-preview.svg" alt="flower" className="ach-flower-2" />

        {/* Achievement file cards (stacked inside folder) */}
        {ACHIEVEMENTS.map((ach, i) => (
          <div
            key={ach.id}
            className={`ach-file ach-file-${i + 1}`}
            style={{
              '--file-color': ach.color,
              animationDelay: `${0.1 + i * 0.12}s`,
            }}
            onClick={() => setDialogData(ach)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setDialogData(ach)}
          >
            <div className="ach-file-inner">
              <div className="ach-file-top">
                <span className="ach-file-tag">{ach.subtitle}</span>
              </div>
              <div className="ach-file-bottom">
                <span className="ach-file-title">{ach.title}</span>
                <span className="ach-file-peek">tap to read ↗</span>
              </div>
            </div>
          </div>
        ))}

        {/* Folder front pocket */}
        <div className="ach-folder-pocket">
          <svg viewBox="0 0 280 160" className="ach-folder-pocket-svg">
            <path
              d="M0,40 Q0,0 40,0 L100,0 L120,30 L240,30 Q280,30 280,70 L280,120 Q280,160 240,160 L40,160 Q0,160 0,120 Z"
              fill="var(--butter)"
            />
            <path
              d="M0,40 Q0,0 40,0 L100,0 L120,30 L240,30 Q280,30 280,70 L280,120 Q280,160 240,160 L40,160 Q0,160 0,120 Z"
              fill="url(#folderGrad)"
            />
            <defs>
              <linearGradient id="folderGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.08)" />
              </linearGradient>
            </defs>
          </svg>

          <div className="ach-folder-pocket-content">
            <div className="ach-folder-stars">✦ ✦ ✦</div>
            <div className="ach-folder-label">Achievements</div>
            <div className="ach-folder-eye-wrap">
              <svg className="ach-folder-eye" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c4a030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Stickers attached to front folder */}
        <InteractiveSticker message="A little ribbon for the beautiful mess that is life."  src="/stickers/bow-removebg-preview.svg" alt="bow" className="ach-bow" />

        {/* Hover hint below */}
        <span className="ach-folder-hint">Hover to peek inside</span>
      </div>

      {/* ── Dialog / Modal ── */}
      {dialogData && (
        <div className="ach-dialog-overlay" onClick={() => setDialogData(null)}>
          <div
            className="ach-dialog"
            onClick={(e) => e.stopPropagation()}
            style={{ '--dialog-accent': dialogData.color }}
          >
            <button className="ach-dialog-close" onClick={() => setDialogData(null)}>
              ×
            </button>

            <h3 className="ach-dialog-title">{dialogData.title}</h3>
            <span className="ach-dialog-subtitle">{dialogData.subtitle}</span>
            <p className="ach-dialog-desc">{dialogData.description}</p>

            <div className="ach-dialog-stamp">
              <span>~ verified sparkle ~</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
