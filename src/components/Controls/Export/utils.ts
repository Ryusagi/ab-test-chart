import html2canvas from 'html2canvas';

export const exportChart = async (
  elem: HTMLElement | null,
  setLoading: (loading: boolean) => void
) => {
  if (elem) {
    try {
      setLoading(true);
      const canvas = await html2canvas(elem, {
        scale: 2, // Увеличивает качество
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
      });

      const link = document.createElement('a');
      //Хардкодить название экспортируемого файла не оч хорошо
      // тк сходу можно придумать больше 3 кейсов экспорта
      // и в этому случае у пользователя будет chart.png, chart.png(1) chart.png(n)
      // а можно chart-line-all
      // chart-line-variations-a-b-c и тд и тп
      link.download = 'chart.png';
      link.href = canvas.toDataURL('image/png');
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      // в макетах этого нет, но пользователю лучше где то на ui подсветить что экспорт упал
      console.error('Error exporting chart:', error);
    } finally {
      setLoading(false);
    }
  }
};
