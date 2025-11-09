import CategoryPartial from '@/components/partial/category-partial';
import { Button } from '@/components/ui/button';
import PopUp from '@/components/ui/pop-up';
import View from '@/components/ui/view';
import { CategoryType } from '@/types/components';
import { PopupInterface } from '@/types/ui';

interface CategoryProps {
  data: CategoryType[];
  loadId: string | null;
  setLoadId: React.Dispatch<React.SetStateAction<string | null>>;
  onDelete: (id: any) => void;
  popUpModal: PopupInterface;
  setPopUpModal: React.Dispatch<React.SetStateAction<PopupInterface>>;
}

const CategoryHeroSection: React.FC<CategoryProps> = ({
  data,
  loadId,
  setLoadId,
  onDelete,
  setPopUpModal,
  popUpModal,
}) => {
  return (
    <View>
      <div className="w-full flex justify-start min-h-screen flex-col">
        <div className=" grid grid-cols-4 grid-rows-1 gap-4 p-4">
          {data.map((items, key) => (
            <CategoryPartial
              data={items}
              loadId={loadId}
              key={key}
              setLoadId={setLoadId}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>
      <Button
        onClick={() => setPopUpModal('categoory')}
        className="fixed bottom-8 right-8 z-50   px-6 py-4 rounded-full shadow-2xl "
      >
        <span className="text-2xl group-hover:rotate-90 transition-transform duration-300">+</span>
        <span className="font-semibold">Add Category</span>
      </Button>

      <PopUp isOpen={popUpModal === 'categoory'} onClose={() => setPopUpModal(null)}>
        <View className="w-full h-full">
          <div className="w-full flex items-center flex-col">
            <p>setup</p>
          </div>
        </View>
      </PopUp>
    </View>
  );
};

export default CategoryHeroSection;
