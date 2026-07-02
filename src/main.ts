import './style.css';
import { initShared } from './shared';
import { initBg } from './three-bg';

initShared();

const canvas = document.getElementById('bg3d') as HTMLCanvasElement | null;
if (canvas) initBg(canvas);
