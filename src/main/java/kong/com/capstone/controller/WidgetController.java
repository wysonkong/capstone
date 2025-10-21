package kong.com.capstone.controller;

import kong.com.capstone.dto.WidgetDTO;
import kong.com.capstone.dto.WidgetRequestDTO;
import kong.com.capstone.model.User;
import kong.com.capstone.model.Widget;
import kong.com.capstone.service.UserService;
import kong.com.capstone.service.WidgetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/widget")
public class WidgetController {
    public final WidgetService widgetService;
    public final UserService userService;

    public WidgetController(WidgetService widgetService, UserService userService){
        this.widgetService = widgetService;
        this.userService = userService;
    }

    @PostMapping("/new_widget")
    public ResponseEntity<WidgetDTO> newWidget(@RequestBody WidgetRequestDTO dto) {
        User user = userService.findById(dto.getUserId());

        if (user == null) {
            return ResponseEntity.badRequest().build();
        }

        Widget widget = new Widget();
        widget.setName(dto.getName());
        widget.setDescription(dto.getDescription());
        widget.setAmount(dto.getAmount());
        widget.setImage(dto.getImage());
        widget.setUser(user);
        widget.setCreated(dto.getCreated());

        Widget savedWidget = widgetService.save(widget);

        WidgetDTO responseDto = new WidgetDTO(
                savedWidget.getId(),
                savedWidget.getName(),
                savedWidget.getDescription(),
                savedWidget.getAmount(),
                savedWidget.getImage(),
                savedWidget.getUser().getUsername(),
                savedWidget.getCreated()
        );

        return ResponseEntity.ok(responseDto);
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

    @PatchMapping("/{id}/amount")
    public ResponseEntity<WidgetDTO> updateAmount(@PathVariable Long id, @RequestBody Map<String, Integer> request) {
        Widget widget = widgetService.findById(id).orElse(null);

        if (widget == null) {
            return ResponseEntity.notFound().build();
        }

        Integer newAmount = request.get("amount");
        if (newAmount == null) {
            return ResponseEntity.badRequest().build();
        }

        widget.setAmount(newAmount);
        Widget updatedWidget = widgetService.save(widget);

        WidgetDTO responseDto = new WidgetDTO(
                updatedWidget.getId(),
                updatedWidget.getName(),
                updatedWidget.getDescription(),
                updatedWidget.getAmount(),
                updatedWidget.getImage(),
                updatedWidget.getUser().getUsername(),
                updatedWidget.getCreated()
        );

        return ResponseEntity.ok(responseDto);
    }
}