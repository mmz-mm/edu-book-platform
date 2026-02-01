import type { CourseType } from '@/types'

export default function() {
	const courseTypeFn = (type: CourseType): string => {
		let val = '';
		switch (type) {
			case 1:
				val = '初级';
				break;
			case 2:
				val = '中级'; 
				break;
			case 3:
				val = '高级';
				break;
			default:
				val = '';
		}
		return val;
	}

	return {
		courseTypeFn
	}
}
