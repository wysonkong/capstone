package kong.com.capstone.repository;

import kong.com.capstone.model.Widget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface WidgetRepository extends JpaRepository<Widget, Long> {
    List<Widget> getAllById(long id);

    ArrayList<Widget> getAllByUser_Id(Widget user_id);
}

