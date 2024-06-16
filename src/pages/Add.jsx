import { useState, lazy, Suspense } from 'react';
import Navbar from '../composants/Navbar';
const ModalReact = lazy(() => import('../composants/ModalReact'));
const FormEmployee = lazy(() => import('../composants/FormEmployee'));
const Add = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
/**
 * Fermer le modal
 */
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Navbar />
 <p className="font-bold text-center my-12 uppercase text-gray-400">Create a new employee</p>
      <div className="text-center font-[Anton]">
        <div className="bg-white lg:w-[32rem] h-auto mb-12 mx-auto rounded-2xl shadow-2xl">
          <Suspense fallback={<div>Loading...</div>}>
            <FormEmployee setIsModalOpen={setIsModalOpen} setModalMessage={setModalMessage} />
          </Suspense>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ModalReact isModalOpen={isModalOpen} modalMessage={modalMessage} closeModal={closeModal} />
      </Suspense>
    </>
  );
};

export default Add;
