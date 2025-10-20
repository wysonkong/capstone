package kong.com.capstone.service;

import kong.com.capstone.model.Widget;
import kong.com.capstone.repository.WidgetRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WidgetService {
    public final WidgetRepository widgetRepository;

    public WidgetService(WidgetRepository widgetRepository) {
        this.widgetRepository = widgetRepository;
    }

    public Widget save(Widget widget){
        return widgetRepository.save(widget);
    }

    public List<Widget> getAllByUser_Id(Widget id) {
        return widgetRepository.getAllByUser_Id(id);
    }

    public List<Widget> findAll() {
        return widgetRepository.findAll();
    }
}
