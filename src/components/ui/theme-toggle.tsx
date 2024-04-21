'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

export function ThemeToggle() {
	const { setTheme, theme } = useTheme()

	return (
		<Button
			variant='ghost'
			size='icon'
			onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
		>
			<Sun className='h-[2rem] w-[1,8rem] dark:hidden' />
			<Moon className='hidden h-7 w-7 dark:block' />
			<span className='sr-only'>Смена темы</span>
		</Button>
	)
}
