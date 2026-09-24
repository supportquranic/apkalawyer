import React from 'react';
import { X, Download, Share, PlusSquare, Check } from 'lucide-react';
import { usePWAInstall } from '@/hooks/usePWAInstall';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ isOpen, onClose }) => {
  const { isInstalled, isIOS, hasNativePrompt, installPWA } = usePWAInstall();

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (hasNativePrompt) {
      const success = await installPWA();
      if (success) {
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-full text-neutral-400 hover:text-black hover:bg-neutral-100 transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header with App Icon */}
        <div className="flex items-center gap-3.5 mb-5">
          <img
            src="/icons/icon-192.png"
            alt="ApkaLawyer App Icon"
            className="h-12 w-12 rounded-xl object-cover border border-neutral-200"
          />
          <div>
            <h3 className="text-base font-bold text-black leading-snug">Install ApkaLawyer</h3>
            <p className="text-xs text-neutral-500">Fast, offline & instant access</p>
          </div>
        </div>

        {/* Content based on platform */}
        {isInstalled ? (
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-center space-y-2 mb-4">
            <div className="flex justify-center">
              <span className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center">
                <Check className="h-4 w-4" />
              </span>
            </div>
            <p className="text-xs font-semibold text-neutral-900">ApkaLawyer is already installed!</p>
            <p className="text-[11px] text-neutral-500">
              You can launch it directly from your home screen or application launcher.
            </p>
          </div>
        ) : isIOS ? (
          <div className="space-y-3 mb-6">
            <p className="text-xs text-neutral-600 leading-relaxed">
              To install ApkaLawyer on your iPhone or iPad:
            </p>
            <div className="space-y-2 p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs">
              <div className="flex items-center gap-2.5 text-neutral-800">
                <Share className="h-4 w-4 text-neutral-900 flex-shrink-0" />
                <span>1. Tap the <strong>Share</strong> button in Safari toolbar.</span>
              </div>
              <div className="flex items-center gap-2.5 text-neutral-800">
                <PlusSquare className="h-4 w-4 text-neutral-900 flex-shrink-0" />
                <span>2. Scroll down and tap <strong>Add to Home Screen</strong>.</span>
              </div>
              <div className="flex items-center gap-2.5 text-neutral-800">
                <Check className="h-4 w-4 text-neutral-900 flex-shrink-0" />
                <span>3. Tap <strong>Add</strong> in the top right.</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 mb-6">
            <p className="text-xs text-neutral-600 leading-relaxed">
              Install the full application on your device for instant offline access, real-time case notifications, and faster loading.
            </p>
            <div className="space-y-1.5 text-xs text-neutral-500">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-black" />
                <span>No app store downloads required</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-black" />
                <span>Instant launch from home screen</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        {!isInstalled && (
          <div>
            {hasNativePrompt ? (
              <button
                type="button"
                onClick={handleInstallClick}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                Install Application
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="w-full inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 py-2 text-xs font-semibold text-neutral-900 hover:bg-neutral-50 transition-colors"
              >
                Got It
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
