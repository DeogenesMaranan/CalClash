import CanvasComponent from '@/components/game/canvas';
import CardComponent from './card';

export default function GameComponent() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <CanvasComponent>
        <CardComponent />
      </CanvasComponent>
    </div>
  );
}
