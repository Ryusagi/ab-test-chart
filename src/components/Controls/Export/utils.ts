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
      link.download = 'chart.png';
      link.href = canvas.toDataURL('image/png');
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting chart:', error);
    } finally {
      setLoading(false);
    }
  }
};
