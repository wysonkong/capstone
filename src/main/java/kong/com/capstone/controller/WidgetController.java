package kong.com.capstone.controller;

import kong.com.capstone.dto.WidgetDTO;
import kong.com.capstone.dto.WidgetRequestDTO;
import kong.com.capstone.model.User;
import kong.com.capstone.model.Widget;
import kong.com.capstone.service.UserService;
import kong.com.capstone.service.WidgetService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/widget")
public class WidgetController {
    public final WidgetService widgetService;
    public final UserService userService;

    public WidgetController(WidgetService widgetService){
        this.widgetService = widgetService;
    }
    public WidgetController(UserService userService){this.userService = userService;}

    @PostMapping("/new_widget")
    public void newWidget(@RequestBody WidgetRequestDTO dto) {
        User user = userService.findById(dto.getUserId()); // fetch managed user

        Widget widget = new Widget();
        widget.setName(dto.getName());
        widget.setDescription(dto.getDescription());
        widget.setAmount(dto.getAmount());
        widget.setImage(dto.getImage());
        widget.setUser(user);
        widget.setCreated(LocalDate.parse(dto.getCreated()));

        widgetService.save(widget);
    }

    @GetMapping("/{id}")
    public List<Widget> getAllByUser_Id(@PathVariable Widget id) {
        return widgetService.getAllByUser_Id(id);
    }

    @GetMapping("/widgets")
    public List<WidgetDTO> findAll() {
        return widgetService.findAll().stream()
                .map(widget -> new WidgetDTO (
                        widget.getId(),
                        widget.getName(),
                        widget.getDescription(),
                        widget.getAmount(),
                        widget.getImage(),
                        widget.getUser().getUsername(),
                        widget.getCreated()
                )).collect(Collectors.toList());
    }
}
