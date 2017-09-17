export class SMath {

    static PI = 3.141592653589793;
    static HALF_PI = SMath.PI/2;
    static TWO_PI = SMath.PI*2;
    static toRADIANS = SMath.PI / 180;
	static toDEGREES = 180 / SMath.PI;

    static B = 4 / SMath.PI;
	static C = -4 / (SMath.PI*SMath.PI);
	static P = 0.225;

    static lerp(t:number, a:number, b:number) {
        return a + t*(b-a);
    }

    static clamp(t:number, a:number, b:number) {
        if( a > b ) {
            let t = b;
            b = a;
            a = t;
        }
        return Math.max(Math.min(t, b), a);
    }

    static clamp01(t:number) {
        return SMath.clamp(t, 0, 1);
    }

    static lerpClamped( t:number, a:number, b:number ) {
        return SMath.lerp( SMath.clamp01(t), a, b );
    }

    static inRange( t:number, a:number, b:number ) {
        return t >= a && t <= b;
    }

    static inRangeStrict( t:number, a:number, b:number ) {
        return t > a && t < b;
    }

    static fabs(a:number) {
        return a < 0 ? -a : a;
    }

    static fuzzyEqual( a:number, b:number, e = 0.0001) {
        return SMath.fabs(a-b) <= e;
    }

    static fsin(x:number ):number {
		let y = SMath.B * x + SMath.C * x * SMath.fabs(x);		
		return SMath.P * (y * SMath.fabs(y) - y) + y;
	}
	
	static fcos(x:number):number {
		x = x + SMath.HALF_PI;
		if (x > SMath.PI)
			x -= SMath.TWO_PI;
		let y = SMath.B * x + SMath.C * x * SMath.fabs(x);		
		return SMath.P * (y * SMath.fabs(y) - y) + y;
	}
	
	static sign( v:number ):number {
		return v >= 0 ? 1 : -1;
	}
}