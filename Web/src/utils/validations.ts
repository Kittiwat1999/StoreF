export type PasswordStrength = 'weak' | 'medium' | 'strong' | '';

export function validateEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email.trim());
}

export function validateUsername(username: string) {
  const trimmed = username.trim();
  return trimmed.length >= 3 && /^[a-zA-Z0-9_]+$/.test(trimmed);
}

export function getPasswordStrength(password: string) {
  const trimmedPassword = password.trim();

  if (!trimmedPassword) {
    return {
      level: '' as PasswordStrength,
      label: '',
      colorClass: 'text-slate-500',
      barClass: 'bg-slate-200',
      widthClass: 'w-0',
    };
  }

  const strongPasswordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@!#$*]).{6,}$/;
  if (strongPasswordRegex.test(trimmedPassword)) {
    return {
      level: 'strong' as PasswordStrength,
      label: 'Strong password',
      colorClass: 'text-emerald-600',
      barClass: 'bg-emerald-500',
      widthClass: 'w-full',
    };
  }

  const hasLetter = /[a-zA-Z]/.test(trimmedPassword);
  const hasNumber = /\d/.test(trimmedPassword);
  const hasSpecial = /[@!#$*]/.test(trimmedPassword);
  const score = [hasLetter, hasNumber, hasSpecial].filter(Boolean).length;

  if (score >= 2) {
    return {
      level: 'medium' as PasswordStrength,
      label: 'Medium password',
      colorClass: 'text-amber-600',
      barClass: 'bg-amber-500',
      widthClass: 'w-2/3',
    };
  }

  return {
    level: 'weak' as PasswordStrength,
    label: 'Weak password',
    colorClass: 'text-red-600',
    barClass: 'bg-red-500',
    widthClass: 'w-1/3',
  };
}

export function validateInteger(number: string) {
  const trimmedNumber = number.trim();
  
  if (!trimmedNumber) {
    return false;
  }
  const regex = /^[0-9]*$/;
  if (regex.test(number)) {
    return true;
  }
  return false;
}

export function validateFileSize(file: File | null, maxSizeInMB: number) {
  if (!file) {
    return true;
  }

  const maxSize = maxSizeInMB * 1024 * 1024; // Convert MB to bytes
  if (file.size > maxSize) {
    return false;
  }
  return true;
}

