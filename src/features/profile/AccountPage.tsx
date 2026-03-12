import { useState } from 'react';
import { supabase } from '../../services/supabase';
import { Profile } from '../../types/profile';
import { User, Shield, Bell, Settings, HelpCircle, LogOut, ChevronRight, Save, Globe } from 'lucide-react';
import { useLanguage, Language } from '../../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const LANG_OPTIONS: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'uz', label: "O'zbekcha", flag: '🇺🇿' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
];

export default function AccountPage() {
  const { t, language, setLanguage } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [profile, setProfile] = useState<Profile | null>({
    id: '',
    full_name: 'Elyor Kurbonboev',
    insurance_type: 'Public',
  });

  async function updateProfile() {
    if (!profile) return;
    const { error } = await supabase.from('profiles').upsert(profile);
    if (!error) setIsEditing(false);
  }

  const menuItems = [
    { icon: Bell, label: t.account.notifications },
    { icon: Settings, label: t.account.settings },
    { icon: HelpCircle, label: t.account.helpSupport },
  ];

  const insuranceLabel =
    profile?.insurance_type === 'Public'
      ? t.account.publicInsurance
      : t.account.privateInsurance;

  return (
    <div className="min-h-screen bg-background safe-bottom">
      {/* Header */}
      <div className="gradient-primary px-4 py-5">
        <h1 className="text-xl font-bold text-primary-foreground">{t.account.title}</h1>
      </div>

      {/* User Card */}
      <div className="mx-4 -mt-4 flex items-center gap-4 rounded-xl bg-card p-4 shadow-card">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-lg font-bold text-secondary-foreground shrink-0">
          EK
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-foreground truncate">{profile?.full_name}</p>
          <p className="text-sm text-muted-foreground">{insuranceLabel}</p>
        </div>
      </div>

      <div className="mt-4 px-4 space-y-3">
        {/* Personal Information */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium text-foreground">{t.account.personalInfo}</span>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-sm font-semibold text-primary"
              >
                {isEditing ? t.account.cancel : t.account.edit}
              </button>
            </div>

            <AnimatePresence>
              {isEditing && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 space-y-2">
                    <input
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                      value={profile?.full_name ?? ''}
                      onChange={e => setProfile(p => p ? { ...p, full_name: e.target.value } : null)}
                    />
                    <button
                      onClick={updateProfile}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground"
                    >
                      <Save className="h-4 w-4" />
                      {t.account.saveChanges}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Insurance & Payment */}
          <button className="w-full flex items-center justify-between border-t border-border px-4 py-3.5">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium text-foreground">{t.account.insurancePayment}</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Language Picker */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <button
            onClick={() => setShowLangPicker(!showLangPicker)}
            className="w-full flex items-center justify-between px-4 py-3.5"
          >
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium text-foreground">{t.account.language}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {LANG_OPTIONS.find(l => l.code === language)?.flag}{' '}
                {LANG_OPTIONS.find(l => l.code === language)?.label}
              </span>
              <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${showLangPicker ? 'rotate-90' : ''}`} />
            </div>
          </button>

          <AnimatePresence>
            {showLangPicker && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden border-t border-border"
              >
                {LANG_OPTIONS.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => { setLanguage(opt.code); setShowLangPicker(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                      language === opt.code
                        ? 'bg-primary/8 text-primary font-semibold'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <span className="text-base">{opt.flag}</span>
                    {opt.label}
                    {language === opt.code && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-primary" />
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Other Menu Items */}
        <div className="rounded-xl border border-border bg-card overflow-hidden divide-y divide-border">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="flex w-full items-center justify-between px-4 py-3.5 transition-colors hover:bg-muted"
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium text-foreground">{item.label}</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Log Out */}
        <div className="rounded-xl border border-destructive/20 bg-card overflow-hidden">
          <button className="flex w-full items-center gap-3 px-4 py-3.5 text-destructive transition-colors hover:bg-destructive/5">
            <LogOut className="h-5 w-5" />
            <span className="font-medium">{t.account.logout}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
