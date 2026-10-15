import { Suspense, ViewTransition } from 'react';
import { useNavigate, useParams } from 'react-router';

import ShowModal from './ShowModal';
import ShowModalSkeleton from './ShowModalSkeleton';

interface ShowModalRouteProps {
  isModal?: boolean;
}

export default function ShowModalRoute({
  isModal = false,
}: ShowModalRouteProps) {
  const { id } = useParams();
  const navigate = useNavigate();

  function handleClose() {
    if (isModal) {
      navigate(-1);
    } else {
      navigate('/');
    }
  }

  function handleOverlayMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  }

  if (!id || !Number.isInteger(Number(id)) || Number(id) <= 0) {
    return <p>Invalid series ID.</p>;
  }

  return (
    <div className="show-modal__overlay" onMouseDown={handleOverlayMouseDown}>
      <ViewTransition name="show-modal-content" default="none">
        <Suspense fallback={<ShowModalSkeleton />}>
          <ShowModal showId={Number(id)} onClose={handleClose} />
        </Suspense>
      </ViewTransition>
    </div>
  );
}
