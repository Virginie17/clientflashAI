interface LogoProps {
  size?: 'small' | 'medium' | 'large'
  showText?: boolean
  className?: string
}

export default function Logo({ size = 'medium', showText = true, className = '' }: LogoProps) {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-10 h-10',
    large: 'w-12 h-12'
  }

  const textSizes = {
    small: 'text-sm',
    medium: 'text-xl',
    large: 'text-2xl'
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`${sizeClasses[size]} bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg`}>
        <span className="text-white font-bold">CF</span>
      </div>
      {showText && (
        <span className={`font-bold text-gray-900 ${textSizes[size]}`}>
          ClientFlash AI
        </span>
      )}
    </div>
  )
}
